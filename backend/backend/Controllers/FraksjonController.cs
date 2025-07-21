using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrisjusteringProsjekt.Models;

namespace PrisjusteringProsjekt.Controllers;

/// <summary>
/// API-kontroller for håndtering av fraksjoner.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class FraksjonController : ControllerBase
{
    private readonly AppDbContext _context;

    public FraksjonController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Hent alle fraksjoner inkludert gruppe, behandlingsmetode og enhet.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Fraksjon>>> GetFraksjoner()
    {
        return await _context.Fraksjoner
            .Include(f => f.Fraksjonsgruppe)
            .Include(f => f.Behandlingsmetode)
            .Include(f => f.Enhet)
            .ToListAsync();
    }

    /// <summary>
    /// Hent én fraksjon basert på ID.
    /// </summary>
    [HttpGet("{fraksjonId}")]
    public async Task<ActionResult<Fraksjon>> GetFraksjon(int fraksjonId)
    {
        var fraksjon = await _context.Fraksjoner
            .Include(f => f.Fraksjonsgruppe)
            .Include(f => f.Behandlingsmetode)
            .Include(f => f.Enhet)
            .FirstOrDefaultAsync(f => f.FraksjonId == fraksjonId);

        if (fraksjon == null) return NotFound();

        return fraksjon;
    }

    /// <summary>
    /// Opprett en ny fraksjon.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<Fraksjon>> PostFraksjon(Fraksjon fraksjon)
    {
        fraksjon.CreatedAt = DateTime.UtcNow;
        _context.Fraksjoner.Add(fraksjon);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetFraksjon), new { fraksjonId = fraksjon.FraksjonId }, fraksjon);
    }

    /// <summary>
    /// Oppdater en eksisterende fraksjon.
    /// </summary>
    [HttpPut("{fraksjonId}")]
    public async Task<IActionResult> PutFraksjon(int fraksjonId, Fraksjon fraksjon)
    {
        if (fraksjonId != fraksjon.FraksjonId)
            return BadRequest("ID i URL stemmer ikke med objektet.");

        var eksisterende = await _context.Fraksjoner.FindAsync(fraksjonId);
        if (eksisterende == null) return NotFound();

        fraksjon.UpdatedAt = DateTime.UtcNow;
        _context.Entry(eksisterende).CurrentValues.SetValues(fraksjon);

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>
    /// Slett en fraksjon.
    /// </summary>
    [HttpDelete("{fraksjonId}")]
    public async Task<IActionResult> DeleteFraksjon(int fraksjonId)
    {
        var fraksjon = await _context.Fraksjoner.FindAsync(fraksjonId);
        if (fraksjon == null) return NotFound();

        _context.Fraksjoner.Remove(fraksjon);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
