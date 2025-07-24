using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PrisjusteringProsjekt.Models;

public class Leie : ArtikkelBase
{
    [Key]
    [Column("id")]
    public int LeieId { get; set; }

    public int? ContainerTypeId { get; set; }
    public ContainerType? ContainerType { get; set; }

    public int? ContainerId { get; set; }
    public Container? Container { get; set; }

    public int? LeverandorId { get; set; }
    public Leverandor? Leverandor { get; set; }

    public int? TransportorId { get; set; }
    public Transportor? Transportor { get; set; }

    public bool ErUtstyr { get; set; } = false;
    public bool ErTjeneste { get; set; } = false;

    // Navigasjon for slettesjekk
    public ICollection<Prislinje> Prislinjer { get; set; } = new List<Prislinje>();

}
