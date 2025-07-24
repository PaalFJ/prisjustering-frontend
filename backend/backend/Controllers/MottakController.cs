using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using PrisjusteringProsjekt.Models;

namespace PrisjusteringProsjekt.Controllers;

/// <summary>
/// API-kontroller for håndtering av mottak.
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class MottakController : ControllerBase
{
    private readonly AppDbContext _context;

    public MottakController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Hent alle mottak.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Mottak>>> GetMottak()
    {
        return await _context.Mottak.ToListAsync();
    }

    /// <summary>
    /// Hent ett mottak basert på ID.
    /// </summary>
    [HttpGet("{mottakId}")]
    public async Task<ActionResult<Mottak>> GetMottak(int mottakId)
    {
        var mottak = await _context.Mottak.FindAsync(mottakId);
        if (mottak == null) return NotFound();

        return mottak;
    }

    /// <summary>
    /// Opprett nytt mottak.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<Mottak>> PostMottak(Mottak mottak)
    {
        mottak.CreatedAt = DateTime.UtcNow;

        _context.Mottak.Add(mottak);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetMottak), new { mottakId = mottak.MottakId }, mottak);
    }

    /// <summary>
    /// Oppdater et eksisterende mottak.
    /// </summary>
    [HttpPut("{mottakId}")]
    public async Task<IActionResult> PutMottak(int mottakId, Mottak mottak)
    {
        if (mottakId != mottak.MottakId)
            return BadRequest("ID i URL stemmer ikke med objektet.");

        var eksisterende = await _context.Mottak.FindAsync(mottakId);
        if (eksisterende == null) return NotFound();

        mottak.UpdatedAt = DateTime.UtcNow;
        _context.Entry(eksisterende).CurrentValues.SetValues(mottak);

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>
    /// Slett et mottak.
    /// </summary>
    /// <summary>
    /// Slett et mottak. Feiler hvis det er i bruk i prislinjer.
    /// </summary>
    [HttpDelete("{mottakId}")]
    public async Task<IActionResult> DeleteMottak(int mottakId)
    {
        var mottak = await _context.Mottak
            .Include(m => m.Prislinjer)
            .FirstOrDefaultAsync(m => m.MottakId == mottakId);

        if (mottak == null)
            return NotFound();

        if (mottak.Prislinjer != null && mottak.Prislinjer.Any())
            return BadRequest("Kan ikke slette: Mottaket er i bruk i en eller flere prislinjer.");

        _context.Mottak.Remove(mottak);
        await _context.SaveChangesAsync();

        return NoContent();
    }

}
