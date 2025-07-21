using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrisjusteringProsjekt.Models;
using backend.Data;

namespace PrisjusteringProsjekt.Controllers;

/// <summary>
/// API-kontroller for å håndtere containertyper.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class ContainerTypeController : ControllerBase
{
    private readonly AppDbContext _context;

    public ContainerTypeController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Hent alle containertyper.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<ContainerType>>> GetContainerTyper()
    {
        return await _context.ContainerTyper.ToListAsync();
    }

    /// <summary>
    /// Hent én containertype basert på ID.
    /// </summary>
    [HttpGet("{containerTypeId}")]
    public async Task<ActionResult<ContainerType>> GetContainerType(int containerTypeId)
    {
        var containerType = await _context.ContainerTyper.FindAsync(containerTypeId);
        if (containerType == null) return NotFound();
        return containerType;
    }

    /// <summary>
    /// Opprett en ny containertype.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<ContainerType>> PostContainerType(ContainerType containerType)
    {
        _context.ContainerTyper.Add(containerType);
        await _context.SaveChangesAsync();
        return CreatedAtAction(nameof(GetContainerType), new { containerTypeId = containerType.ContainerTypeId }, containerType);
    }

    /// <summary>
    /// Oppdater en eksisterende containertype.
    /// </summary>
    [HttpPut("{containerTypeId}")]
    public async Task<IActionResult> PutContainerType(int containerTypeId, ContainerType containerType)
    {
        if (containerTypeId != containerType.ContainerTypeId)
            return BadRequest("ID i URL stemmer ikke med objektet.");

        _context.Entry(containerType).State = EntityState.Modified;
        await _context.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>
    /// Slett en containertype.
    /// </summary>
    [HttpDelete("{containerTypeId}")]
    public async Task<IActionResult> DeleteContainerType(int containerTypeId)
    {
        var containerType = await _context.ContainerTyper.FindAsync(containerTypeId);
        if (containerType == null) return NotFound();

        _context.ContainerTyper.Remove(containerType);
        await _context.SaveChangesAsync();
        return NoContent();
    }
}
