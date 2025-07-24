using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrisjusteringProsjekt.Models;
using backend.Data;

namespace PrisjusteringProsjekt.Controllers;

/// <summary>
/// API-kontroller for håndtering av fraksjoner.
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class FraksjonController : ControllerBase
{
    private readonly AppDbContext _context;

    public FraksjonController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Hent alle fraksjoner.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Fraksjon>>> GetFraksjoner()
    {
        return await _context.Fraksjoner
            .Include(f => f.Enhet)
            .Include(f => f.Fraksjonsgruppe)
            .Include(f => f.Behandlingsmetode)
            .ToListAsync();
    }

    /// <summary>
    /// Hent én fraksjon basert på ID.
    /// </summary>
    [HttpGet("{fraksjonId}")]
    public async Task<ActionResult<Fraksjon>> GetFraksjon(int fraksjonId)
    {
        var fraksjon = await _context.Fraksjoner
            .Include(f => f.Enhet)
            .Include(f => f.Fraksjonsgruppe)
            .Include(f => f.Behandlingsmetode)
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

        fraksjon.UpdatedAt = DateTime.UtcNow;
        _context.Entry(fraksjon).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await FraksjonExists(fraksjonId))
                return NotFound();
            else
                throw;
        }

        return NoContent();
    }

    /// <summary>
    /// Slett en fraksjon (nekter dersom i bruk).
    /// </summary>
    [HttpDelete("{fraksjonId}")]
    public async Task<IActionResult> DeleteFraksjon(int fraksjonId)
    {
        var fraksjon = await _context.Fraksjoner
            .Include(f => f.Prislinjer)
            .FirstOrDefaultAsync(f => f.FraksjonId == fraksjonId);

        if (fraksjon == null)
            return NotFound();

        if (fraksjon.Prislinjer?.Any() == true)
            return Conflict("Kan ikke slette: Fraksjonen er i bruk i prislinjer.");

        _context.Fraksjoner.Remove(fraksjon);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private async Task<bool> FraksjonExists(int id)
    {
        return await _context.Fraksjoner.AnyAsync(f => f.FraksjonId == id);
    }
}
