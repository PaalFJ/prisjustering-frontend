using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using PrisjusteringProsjekt.Models;

namespace PrisjusteringProsjekt.Controllers;

/// <summary>
/// API-kontroller for håndtering av enheter (f.eks. kg, tonn, stk).
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class EnhetController : ControllerBase
{
    private readonly AppDbContext _context;

    public EnhetController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Hent alle enheter.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Enhet>>> GetEnheter()
    {
        return await _context.Enheter.ToListAsync();
    }

    /// <summary>
    /// Hent én spesifikk enhet basert på ID.
    /// </summary>
    [HttpGet("{enhetId}")]
    public async Task<ActionResult<Enhet>> GetEnhet(int enhetId)
    {
        var enhet = await _context.Enheter.FindAsync(enhetId);
        if (enhet == null) return NotFound();

        return enhet;
    }

    /// <summary>
    /// Opprett en ny enhet.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<Enhet>> PostEnhet(Enhet enhet)
    {
        _context.Enheter.Add(enhet);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetEnhet), new { enhetId = enhet.EnhetId }, enhet);
    }

    /// <summary>
    /// Oppdater en eksisterende enhet.
    /// </summary>
    [HttpPut("{enhetId}")]
    public async Task<IActionResult> PutEnhet(int enhetId, Enhet enhet)
    {
        if (enhetId != enhet.EnhetId)
            return BadRequest("ID i URL stemmer ikke med objektet.");

        _context.Entry(enhet).State = EntityState.Modified;

        try
        {
            await _context.SaveChangesAsync();
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await EnhetExists(enhetId))
                return NotFound();
            else
                throw;
        }

        return NoContent();
    }

    /// <summary>
    /// Slett en enhet.
    /// </summary>
    [HttpDelete("{enhetId}")]
    public async Task<IActionResult> DeleteEnhet(int enhetId)
    {
        var enhet = await _context.Enheter.FindAsync(enhetId);
        if (enhet == null) return NotFound();

        _context.Enheter.Remove(enhet);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    private async Task<bool> EnhetExists(int id)
    {
        return await _context.Enheter.AnyAsync(e => e.EnhetId == id);
    }
}
