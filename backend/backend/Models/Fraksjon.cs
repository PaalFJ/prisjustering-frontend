using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PrisjusteringProsjekt.Models
{
    public class Fraksjon : ArtikkelBase
    {
        [Key]
        [Column("id")]
        public int FraksjonId { get; set; }

        [MaxLength(50)]
        public string? VarenummerNS { get; set; }

        [Required]
        public int FraksjonsgruppeId { get; set; }

        public int BehandlingsmetodeId { get; set; }

        public bool FarligAvfall { get; set; } = false;

        // Navigasjon
        public Fraksjonsgruppe? Fraksjonsgruppe { get; set; }
        public Behandlingsmetode? Behandlingsmetode { get; set; }
       

        public ICollection<Prislinje>? Prislinjer { get; set; }
        public ICollection<PrislinjeHistorikk>? PrislinjeHistorikk { get; set; }
    }
}
