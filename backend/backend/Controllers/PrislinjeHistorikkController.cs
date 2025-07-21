using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrisjusteringProsjekt.Models;
using backend.Data;

namespace PrisjusteringProsjekt.Controllers;

/// <summary>
/// API-kontroller for visning av prislinjehistorikk.
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class PrislinjeHistorikkController : ControllerBase
{
    private readonly AppDbContext _context;

    public PrislinjeHistorikkController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Hent all historikk for alle prislinjer.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<PrislinjeHistorikk>>> GetHistorikk()
    {
        return await _context.PrislinjeHistorikk
            .OrderByDescending(h => h.EndretTidspunkt)
            .ToListAsync();
    }

    /// <summary>
    /// Hent historikk for én spesifikk prislinje.
    /// </summary>
    [HttpGet("prislinje/{prislinjeId}")]
    public async Task<ActionResult<IEnumerable<PrislinjeHistorikk>>> GetHistorikkForPrislinje(int prislinjeId)
    {
        var historikk = await _context.PrislinjeHistorikk
            .Where(h => h.PrislinjeId == prislinjeId)
            .OrderByDescending(h => h.EndretTidspunkt)
            .ToListAsync();

        if (historikk.Count == 0) return NotFound();

        return historikk;
    }

    /// <summary>
    /// Hent én historikkpost basert på historikk-ID.
    /// </summary>
    [HttpGet("{id}")]
    public async Task<ActionResult<PrislinjeHistorikk>> GetHistorikkPost(int id)
    {
        var historikk = await _context.PrislinjeHistorikk.FindAsync(id);
        if (historikk == null) return NotFound();

        return historikk;
    }
}
