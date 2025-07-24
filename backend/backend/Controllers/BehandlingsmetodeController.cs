using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrisjusteringProsjekt.Models;
using backend.Data;

namespace PrisjusteringProsjekt.Controllers;

/// <summary>
/// API-kontroller for å håndtere behandlingsmetoder.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class BehandlingsmetodeController : ControllerBase
{
    private readonly AppDbContext _context;

    public BehandlingsmetodeController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Hent alle behandlingsmetoder.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Behandlingsmetode>>> GetBehandlingsmetoder()
    {
        return await _context.Behandlingsmetoder.ToListAsync();
    }

    /// <summary>
    /// Hent én behandlingsmetode basert på ID.
    /// </summary>
    [HttpGet("{behandlingsMetodeId}")]
    public async Task<ActionResult<Behandlingsmetode>> GetBehandlingsmetode(int behandlingsMetodeId)
    {
        var metode = await _context.Behandlingsmetoder.FindAsync(behandlingsMetodeId);
        if (metode == null) return NotFound();
        return metode;
    }

    /// <summary>
    /// Opprett en ny behandlingsmetode.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<Behandlingsmetode>> PostBehandlingsmetode(Behandlingsmetode metode)
    {
        _context.Behandlingsmetoder.Add(metode);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetBehandlingsmetode), new { behandlingsMetodeId = metode.BehandlingsMetodeId }, metode);
    }

    /// <summary>
    /// Oppdater en eksisterende behandlingsmetode.
    /// </summary>
    [HttpPut("{behandlingsMetodeId}")]
    public async Task<IActionResult> PutBehandlingsmetode(int behandlingsMetodeId, Behandlingsmetode metode)
    {
        if (behandlingsMetodeId != metode.BehandlingsMetodeId)
            return BadRequest("ID i URL stemmer ikke med objektet.");

        metode.UpdatedAt = DateTime.UtcNow;
        _context.Entry(metode).State = EntityState.Modified;

        await _context.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>
    /// Slett en behandlingsmetode.
    /// </summary>
    [HttpDelete("{behandlingsMetodeId}")]
    public async Task<IActionResult> DeleteBehandlingsmetode(int behandlingsMetodeId)
    {
        var metode = await _context.Behandlingsmetoder.FindAsync(behandlingsMetodeId);
        if (metode == null) return NotFound();

        bool iBruk = await _context.Fraksjoner.AnyAsync(f => f.BehandlingsmetodeId == behandlingsMetodeId);
        if (iBruk)
            return Conflict("Kan ikke slette. Behandlingsmetoden er i bruk av én eller flere fraksjoner.");

        _context.Behandlingsmetoder.Remove(metode);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
