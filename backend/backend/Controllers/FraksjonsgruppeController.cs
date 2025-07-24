using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using backend.Data;
using PrisjusteringProsjekt.Models;

namespace PrisjusteringProsjekt.Controllers;

/// <summary>
/// API-kontroller for håndtering av fraksjonsgrupper.
/// </summary>
[ApiController]
[Route("api/[controller]")]
public class FraksjonsgruppeController : ControllerBase
{
    private readonly AppDbContext _context;

    public FraksjonsgruppeController(AppDbContext context)
    {
        _context = context;
    }

    /// <summary>
    /// Hent alle fraksjonsgrupper.
    /// </summary>
    [HttpGet]
    public async Task<ActionResult<IEnumerable<Fraksjonsgruppe>>> GetFraksjonsgrupper()
    {
        return await _context.Fraksjonsgrupper.ToListAsync();
    }

    /// <summary>
    /// Hent én fraksjonsgruppe basert på ID.
    /// </summary>
    [HttpGet("{fraksjonsgruppeId}")]
    public async Task<ActionResult<Fraksjonsgruppe>> GetFraksjonsgruppe(int fraksjonsgruppeId)
    {
        var gruppe = await _context.Fraksjonsgrupper.FindAsync(fraksjonsgruppeId);
        if (gruppe == null) return NotFound();

        return gruppe;
    }

    /// <summary>
    /// Opprett en ny fraksjonsgruppe.
    /// </summary>
    [HttpPost]
    public async Task<ActionResult<Fraksjonsgruppe>> PostFraksjonsgruppe(Fraksjonsgruppe fraksjonsgruppe)
    {
        fraksjonsgruppe.CreatedAt = DateTime.UtcNow;
        _context.Fraksjonsgrupper.Add(fraksjonsgruppe);
        await _context.SaveChangesAsync();

        return CreatedAtAction(nameof(GetFraksjonsgruppe), new { fraksjonsgruppeId = fraksjonsgruppe.FraksjonsgruppeId }, fraksjonsgruppe);
    }

    /// <summary>
    /// Oppdater en eksisterende fraksjonsgruppe.
    /// </summary>
    [HttpPut("{fraksjonsgruppeId}")]
    public async Task<IActionResult> PutFraksjonsgruppe(int fraksjonsgruppeId, Fraksjonsgruppe fraksjonsgruppe)
    {
        if (fraksjonsgruppeId != fraksjonsgruppe.FraksjonsgruppeId)
            return BadRequest("ID i URL stemmer ikke med objektet.");

        var eksisterende = await _context.Fraksjonsgrupper.FindAsync(fraksjonsgruppeId);
        if (eksisterende == null) return NotFound();

        fraksjonsgruppe.UpdatedAt = DateTime.UtcNow;
        _context.Entry(eksisterende).CurrentValues.SetValues(fraksjonsgruppe);

        await _context.SaveChangesAsync();
        return NoContent();
    }

    /// <summary>
    /// Slett en fraksjonsgruppe.
    /// </summary>
    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteFraksjonsgruppe(int id)
    {
        var fraksjonsgruppe = await _context.Fraksjonsgrupper.FindAsync(id);

        if (fraksjonsgruppe == null)
            return NotFound();

        // Sjekk om det finnes noen Fraksjon som bruker denne gruppa
        bool iBruk = await _context.Fraksjoner.AnyAsync(f => f.FraksjonsgruppeId == id);
        if (iBruk)
            return Conflict("Kan ikke slette. Fraksjonsgruppen er i bruk av en eller flere fraksjoner.");

        _context.Fraksjonsgrupper.Remove(fraksjonsgruppe);
        await _context.SaveChangesAsync();

        return NoContent();
    }
}
