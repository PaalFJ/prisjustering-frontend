using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrisjusteringProsjekt.Models;
using backend.Data;

namespace PrisjusteringProsjekt.Controllers;

/// <summary>
/// API-kontroller for å håndtere containere.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class ContainerController : ControllerBase
{
    private readonly AppDbContext _context;

    public ContainerController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Hent alle containere.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Container>>> GetContainere()
    {
        return await _context.Containere
            .Include(c => c.ContainerType)
            .Include(c => c.Enhet)
            .ToListAsync();
    }

    /// <summary>
    /// Hent én container basert på ID.
    /// </summary>
    [HttpGet("{containerId}")]
    public async Task<ActionResult<Container>> GetContainer(int containerId)
    {
        var container = await _context.Containere
            .Include(c => c.ContainerType)
            .Include(c => c.Enhet) // Inkluderer Enhet-relasjonen
            .FirstOrDefaultAsync(c => c.ContainerId == containerId);

        if (container == null) return NotFound();
        return container;
    }

    /// <summary>
    /// Opprett en ny container.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<Container>> PostContainer(Container container)
    {
        _context.Containere.Add(container);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetContainer), new { containerId = container.ContainerId }, container);
    }

    /// <summary>
    /// Oppdater en eksisterende container.
    /// </summary>
    [HttpPut("{containerId}")]
    public async Task<IActionResult> PutContainer(int containerId, Container container)
    {
        if (containerId != container.ContainerId)
            return BadRequest("ID i URL stemmer ikke med objektet.");

        _context.Entry(container).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    [HttpDelete("{containerId}")]
    public async Task<IActionResult> DeleteContainer(int containerId)
    {
        var container = await _context.Containere
            .Include(c => c.Leier)
            .Include(c => c.Prislinjer)
            .Include(c => c.PrislinjeHistorikk)
            .FirstOrDefaultAsync(c => c.ContainerId == containerId);

        if (container == null)
            return NotFound();

        bool iBruk = (container.Leier?.Any() == true) ||
                     (container.Prislinjer?.Any() == true) ||
                     (container.PrislinjeHistorikk?.Any() == true);

        if (iBruk)
            return Conflict("Kan ikke slette. Containeren er i bruk i systemet.");

        _context.Containere.Remove(container);
        await _context.SaveChangesAsync();

        return NoContent();
    }

}
