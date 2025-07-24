using PrisjusteringProsjekt.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace backend.Models
{
    public class Salgsvare : ArtikkelBase
    {
        [Key]
        [Column("id")]
        public int SalgsvareId { get; set; }

        [Required]
        public bool ErTjeneste { get; set; } = false;

        [MaxLength(200)]
        public string? ArtikkeltekstLeverandor { get; set; }

        public int? TransportorId { get; set; }
        public Transportor? Transportor { get; set; }

        public int? MottakId { get; set; }
        public Mottak? Mottak { get; set; }

        [MaxLength(20)]
        public string? VarenummerLeverandor { get; set; }

        public ICollection<Prislinje>? Prislinjer { get; set; }
        public ICollection<PrislinjeHistorikk>? PrislinjeHistorikk { get; set; }
    }
}
