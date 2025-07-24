using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrisjusteringProsjekt.Models;
using backend.Data;
using backend.Models;

namespace PrisjusteringProsjekt.Controllers;

/// <summary>
/// API-kontroller for å håndtere salgsvarer (utstyr og tjenester).
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class SalgsvareController : ControllerBase
{
    private readonly AppDbContext _context;

    public SalgsvareController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Hent alle salgsvarer.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Salgsvare>>> GetSalgsvarer()
    {
        return await _context.Salgsvarer
            .Include(s => s.Enhet)
            .Include(s => s.Transportor)
            .Include(s => s.Mottak)
            .ToListAsync();
    }

    /// <summary>
    /// Hent én salgsartikkel basert på ID.
    /// </summary>
    [HttpGet("{salgsvareId}")]
    public async Task<ActionResult<Salgsvare>> GetSalgsvare(int salgsvareId)
    {
        var salgsvare = await _context.Salgsvarer
            .Include(s => s.Enhet)
            .Include(s => s.Transportor)
            .Include(s => s.Mottak)
            .FirstOrDefaultAsync(s => s.SalgsvareId == salgsvareId);

        if (salgsvare == null)
            return NotFound();

        return salgsvare;
    }

    /// <summary>
    /// Opprett ny salgsartikkel.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<Salgsvare>> PostSalgsvare(Salgsvare salgsvare)
    {
        if (string.IsNullOrWhiteSpace(salgsvare.ArtikkeltekstInternt))
            return BadRequest("Artikkeltekst internt er påkrevd.");

        _context.Salgsvarer.Add(salgsvare);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetSalgsvare), new { salgsvareId = salgsvare.SalgsvareId }, salgsvare);
    }

    /// <summary>
    /// Oppdater eksisterende salgsartikkel.
    /// </summary>
    [HttpPut("{salgsvareId}")]
    public async Task<IActionResult> PutSalgsvare(int salgsvareId, Salgsvare salgsvare)
    {
        if (salgsvareId != salgsvare.SalgsvareId)
            return BadRequest("ID i URL stemmer ikke med objektet.");

        var eksisterende = await _context.Salgsvarer.FindAsync(salgsvareId);
        if (eksisterende == null) return NotFound();

        salgsvare.UpdatedAt = DateTime.UtcNow;
        _context.Entry(eksisterende).CurrentValues.SetValues(salgsvare);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>
    /// Slett salgsartikkel (hvis ikke i bruk).
    /// </summary>
    [HttpDelete("{salgsvareId}")]
    public async Task<IActionResult> DeleteSalgsvare(int salgsvareId)
    {
        var salgsvare = await _context.Salgsvarer
            .Include(s => s.Prislinjer)
            .Include(s => s.PrislinjeHistorikk)
            .FirstOrDefaultAsync(s => s.SalgsvareId == salgsvareId);

        if (salgsvare == null)
            return NotFound();

        bool iBruk = (salgsvare.Prislinjer?.Any() == true) ||
                     (salgsvare.PrislinjeHistorikk?.Any() == true);

        if (iBruk)
            return Conflict("Kan ikke slette – salgsvaren er i bruk i systemet.");

        _context.Salgsvarer.Remove(salgsvare);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
