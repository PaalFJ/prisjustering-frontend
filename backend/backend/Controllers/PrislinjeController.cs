using backend.Data;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using PrisjusteringProsjekt.Models;

namespace PrisjusteringProsjekt.Controllers;

/// <summary>
/// API-kontroller for håndtering av prislinjer.
/// </summary>
[Route("api/[controller]")]
[ApiController]
public class PrislinjeController : ControllerBase
{
    private readonly AppDbContext _context;

    public PrislinjeController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Hent alle prislinjer med relasjoner.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Prislinje>>> GetPrislinjer()
    {
        return await _context.Prislinjer
            .Include(p => p.Fraksjon)
            .Include(p => p.Leie)
            .Include(p => p.Mottak)
            .Include(p => p.Transportor)
            .Include(p => p.Leverandor)
            .Include(p => p.Container)
            .Include(p => p.ContainerType)
            .ToListAsync();
    }

    /// <summary>
    /// Opprett ny prislinje.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<Prislinje>> PostPrislinje(Prislinje prislinje)
    {
        BeregnPriser(prislinje);
        prislinje.CreatedAt = DateTime.UtcNow;

        _context.Prislinjer.Add(prislinje);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetPrislinjer), new { id = prislinje.PrislinjeId }, prislinje);
    }

    /// <summary>
    /// Oppdater en prislinje og lagre historikk.
    /// </summary>
    [HttpPut("{id}")]
    public async Task<IActionResult> PutPrislinje(int id, Prislinje updated)
    {
        if (id != updated.PrislinjeId)
            return BadRequest();

        var eksisterende = await _context.Prislinjer.FindAsync(id);
        if (eksisterende == null) return NotFound();

        var historikk = new PrislinjeHistorikk
        {
            PrislinjeId = eksisterende.PrislinjeId,
            EndretTidspunkt = DateTime.UtcNow,
            EndretAv = "systembruker",
            Endringstype = Endringstype.Redigering,
            EndringsNotat = updated.EndringsNotat,
            // TODO: Kopier relevante felter for sporbarhet
        };

        _context.PrislinjeHistorikk.Add(historikk);

        BeregnPriser(updated);
        updated.UpdatedAt = DateTime.UtcNow;
        _context.Entry(eksisterende).CurrentValues.SetValues(updated);

        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>
    /// Slett en prislinje.
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeletePrislinje(int id)
    {
        var prislinje = await _context.Prislinjer.FindAsync(id);
        if (prislinje == null) return NotFound();

        _context.Prislinjer.Remove(prislinje);
        await _context.SaveChangesAsync();

        return NoContent();
    }

    /// <summary>
    /// Kalkulerer kostpriser og veiledende pris basert på innsendte kostnader og påslag.
    /// </summary>
    private void BeregnPriser(Prislinje p)
    {
        p.Kostpris1 =
            (p.PrisLeverandor ?? 0) +
            (p.PrisOmlasting ?? 0) +
            (p.PrisPressing ?? 0) +
            (p.PrisSortering ?? 0) +
            (p.PrisKverning ?? 0) +
            (p.PrisBomavgift ?? 0) +
            (p.PrisStatsavgift ?? 0) +
            (p.PrisTransportSluttbehandling ?? 0) +
            (p.AndreKostnader ?? 0);

        p.AdministrasjonsPris = p.Kostpris1 * (p.AdministrasjonsProsent / 100);
        p.Kostpris2 = p.Kostpris1 + p.AdministrasjonsPris;

        if (p.BrukManuellVeiledendePris)
        {
            // behold eksisterende veiledende pris
        }
        else if (p.BrukProsentbasertVeiledendePris)
        {
            p.VeiledendePris = p.Kostpris2 * (1 + p.VeiledendeProsent / 100);
        }
        else
        {
            p.VeiledendePris = p.Kostpris2 * 1.2m;
        }
    }
}
