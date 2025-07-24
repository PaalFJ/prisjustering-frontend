using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrisjusteringProsjekt.Models;

namespace PrisjusteringProsjekt.Controllers;

/// <summary>
/// API-kontroller for håndtering av leverandører.
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class LeverandorController : ControllerBase
{
    private readonly AppDbContext _context;

    public LeverandorController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Hent alle leverandører.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Leverandor>>> GetLeverandorer()
    {
        return await _context.Leverandorer.ToListAsync();
    }

    /// <summary>
    /// Hent én leverandør basert på ID.
    /// </summary>
    [HttpGet("{leverandorId}")]
    public async Task<ActionResult<Leverandor>> GetLeverandor(int leverandorId)
    {
        var leverandor = await _context.Leverandorer.FindAsync(leverandorId);
        if (leverandor == null) return NotFound();

        return leverandor;
    }

    /// <summary>
    /// Opprett en ny leverandør.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<Leverandor>> PostLeverandor(Leverandor leverandor)
    {
        leverandor.CreatedAt = DateTime.UtcNow;

        _context.Leverandorer.Add(leverandor);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetLeverandor), new { leverandorId = leverandor.LeverandorId }, leverandor);
    }

    /// <summary>
    /// Oppdater en eksisterende leverandør.
    /// </summary>
    [HttpPut("{leverandorId}")]
    public async Task<IActionResult> PutLeverandor(int leverandorId, Leverandor leverandor)
    {
        if (leverandorId != leverandor.LeverandorId)
            return BadRequest("ID i URL stemmer ikke med objektet.");

        var eksisterende = await _context.Leverandorer.FindAsync(leverandorId);
        if (eksisterende == null) return NotFound();

        leverandor.UpdatedAt = DateTime.UtcNow;
        _context.Entry(eksisterende).CurrentValues.SetValues(leverandor);

        await _context.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>
    /// Slett en leverandør.
    /// </summary>
    /// <summary>
    /// Slett en leverandør.
    /// Feiler dersom leverandøren er i bruk.
    /// </summary>
    [HttpDelete("{leverandorId}")]
    public async Task<IActionResult> DeleteLeverandor(int leverandorId)
    {
        var leverandor = await _context.Leverandorer
            .Include(l => l.Leier)
            .Include(l => l.Prislinjer)
            .FirstOrDefaultAsync(l => l.LeverandorId == leverandorId);

        if (leverandor == null)
            return NotFound();

        if ((leverandor.Leier?.Any() ?? false) || (leverandor.Prislinjer?.Any() ?? false))
            return BadRequest("Kan ikke slette: Leverandøren er i bruk i en eller flere artikler eller prislinjer.");

        _context.Leverandorer.Remove(leverandor);
        await _context.SaveChangesAsync();

        return NoContent();
    }

}
