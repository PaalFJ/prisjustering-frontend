using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrisjusteringProsjekt.Models;
using backend.Data;

namespace PrisjusteringProsjekt.Controllers;

/// <summary>
/// API-kontroller for håndtering av transportører.
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class TransportorController : ControllerBase
{
    private readonly AppDbContext _context;

    public TransportorController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Hent alle transportører.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Transportor>>> GetTransportorer()
    {
        return await _context.Transportorer.ToListAsync();
    }

    /// <summary>
    /// Hent én transportør basert på ID.
    /// </summary>
    [HttpGet("{transportorId}")]
    public async Task<ActionResult<Transportor>> GetTransportor(int transportorId)
    {
        var transportor = await _context.Transportorer.FindAsync(transportorId);
        if (transportor == null) return NotFound();
        return transportor;
    }

    /// <summary>
    /// Opprett ny transportør.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<Transportor>> PostTransportor(Transportor transportor)
    {
        transportor.CreatedAt = DateTime.UtcNow;
        _context.Transportorer.Add(transportor);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetTransportor), new { transportorId = transportor.TransportorId }, transportor);
    }

    /// <summary>
    /// Oppdater en eksisterende transportør.
    /// </summary>
    [HttpPut("{transportorId}")]
    public async Task<IActionResult> PutTransportor(int transportorId, Transportor transportor)
    {
        if (transportorId != transportor.TransportorId)
            return BadRequest("ID i URL stemmer ikke med objektet.");

        var eksisterende = await _context.Transportorer.FindAsync(transportorId);
        if (eksisterende == null) return NotFound();

        transportor.UpdatedAt = DateTime.UtcNow;
        _context.Entry(eksisterende).CurrentValues.SetValues(transportor);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>
    /// Slett en transportør (kun hvis ikke i bruk).
    /// </summary>
    [HttpDelete("{transportorId}")]
    public async Task<IActionResult> DeleteTransportor(int transportorId)
    {
        var transportor = await _context.Transportorer
            .Include(t => t.Prislinjer)
            .Include(t => t.PrislinjeHistorikk)
            .FirstOrDefaultAsync(t => t.TransportorId == transportorId);

        if (transportor == null) return NotFound();

        bool iBruk = (transportor.Prislinjer?.Any() == true) || (transportor.PrislinjeHistorikk?.Any() == true);
        if (iBruk) return Conflict("Kan ikke slette – transportøren er i bruk.");

        _context.Transportorer.Remove(transportor);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
