using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PrisjusteringProsjekt.Models;

/// <summary>
/// Representerer en gebyrartikkel (internt gebyr).
/// </summary>
public class Gebyr : ArtikkelBase
{
    [Key]
    [Column("id")]
    public int GebyrId { get; set; }

    // Navigasjon for slettesjekk
    public ICollection<Prislinje> Prislinjer { get; set; } = new List<Prislinje>();
}
