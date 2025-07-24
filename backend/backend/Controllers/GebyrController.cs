using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrisjusteringProsjekt.Models;
using backend.Data;

namespace PrisjusteringProsjekt.Controllers;

/// <summary>
/// API-kontroller for håndtering av gebyrartikler.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class GebyrController : ControllerBase
{
    private readonly AppDbContext _context;

    public GebyrController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Hent alle gebyrartikler med relasjoner.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Gebyr>>> GetGebyrer()
    {
        return await _context.Gebyrer
            .Include(g => g.Enhet)
            .ToListAsync();
    }

    /// <summary>
    /// Hent én gebyrartikkel basert på ID.
    /// </summary>
    [HttpGet("{gebyrId}")]
    public async Task<ActionResult<Gebyr>> GetGebyr(int gebyrId)
    {
        var gebyr = await _context.Gebyrer
            .Include(g => g.Enhet)
            .FirstOrDefaultAsync(g => g.GebyrId == gebyrId);

        if (gebyr == null)
            return NotFound();

        return gebyr;
    }

    /// <summary>
    /// Opprett ny gebyrartikkel.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<Gebyr>> PostGebyr(Gebyr gebyr)
    {
        _context.Gebyrer.Add(gebyr);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetGebyr), new { gebyrId = gebyr.GebyrId }, gebyr);
    }

    /// <summary>
    /// Oppdater eksisterende gebyrartikkel.
    /// </summary>
    [HttpPut("{gebyrId}")]
    public async Task<IActionResult> PutGebyr(int gebyrId, Gebyr gebyr)
    {
        if (gebyrId != gebyr.GebyrId)
            return BadRequest("ID i URL stemmer ikke med objektet.");

        _context.Entry(gebyr).State = EntityState.Modified;
        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>
    /// Slett gebyrartikkel (hvis ikke i bruk).
    /// </summary>
    [HttpDelete("{gebyrId}")]
    public async Task<IActionResult> DeleteGebyr(int gebyrId)
    {
        var gebyr = await _context.Gebyrer
            .Include(g => g.Prislinjer)
            .FirstOrDefaultAsync(g => g.GebyrId == gebyrId);

        if (gebyr == null)
            return NotFound();

        if (gebyr.Prislinjer.Any())
            return Conflict("Kan ikke slette – gebyret er i bruk i en prislinje.");

        _context.Gebyrer.Remove(gebyr);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
