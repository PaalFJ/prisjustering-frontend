using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrisjusteringProsjekt.Models;
using backend.Data;

namespace PrisjusteringProsjekt.Controllers;

/// <summary>
/// API-kontroller for håndtering av leieartikler.
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class LeieController : ControllerBase
{
    private readonly AppDbContext _context;

    public LeieController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Hent alle leieartikler med relasjoner.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Leie>>> GetLeier()
    {
        return await _context.Leier
            .Include(l => l.Enhet)
            .Include(l => l.Leverandor)
            .Include(l => l.Transportor)
            .Include(l => l.ContainerType)
            .Include(l => l.Container)
            .ToListAsync();
    }

    /// <summary>
    /// Hent én leieartikkel basert på ID.
    /// </summary>
    [HttpGet("{leieId}")]
    public async Task<ActionResult<Leie>> GetLeie(int leieId)
    {
        var leie = await _context.Leier
            .Include(l => l.Enhet)
            .Include(l => l.Leverandor)
            .Include(l => l.Transportor)
            .Include(l => l.ContainerType)
            .Include(l => l.Container)
            .FirstOrDefaultAsync(l => l.LeieId == leieId);

        if (leie == null) return NotFound();
        return leie;
    }

    /// <summary>
    /// Opprett ny leieartikkel.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<Leie>> PostLeie(Leie leie)
    {
        if (string.IsNullOrWhiteSpace(leie.ArtikkeltekstInternt))
            return BadRequest("Artikkeltekst internt er påkrevd.");

        if (leie.EnhetId <= 0) return BadRequest("Ugyldig EnhetId.");

        _context.Leier.Add(leie);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetLeie), new { leieId = leie.LeieId }, leie);
    }

    /// <summary>
    /// Oppdater en eksisterende leieartikkel.
    /// </summary>
    [HttpPut("{leieId}")]
    public async Task<IActionResult> PutLeie(int leieId, Leie leie)
    {
        if (leieId != leie.LeieId)
            return BadRequest("ID i URL stemmer ikke med objektet.");

        var eksisterende = await _context.Leier.FindAsync(leieId);
        if (eksisterende == null) return NotFound();

        leie.UpdatedAt = DateTime.UtcNow;
        _context.Entry(eksisterende).CurrentValues.SetValues(leie);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>
    /// Slett en leieartikkel.
    /// </summary>
    [HttpDelete("{leieId}")]
    public async Task<IActionResult> DeleteLeie(int leieId)
    {
        var leie = await _context.Leier
            .Include(l => l.Prislinjer)
            .FirstOrDefaultAsync(l => l.LeieId == leieId);

        if (leie == null) return NotFound();

        if (leie.Prislinjer.Any())
            return Conflict("Kan ikke slette – leieartikkelen er i bruk i en prislinje.");

        _context.Leier.Remove(leie);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
