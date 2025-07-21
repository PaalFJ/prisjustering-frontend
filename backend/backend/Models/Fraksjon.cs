using PrisjusteringProsjekt.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace PrisjusteringProsjekt.Models
{
    public class Fraksjon
    {
        [Key]
        [Column("id")]
        public int FraksjonId { get; set; }
        [Required]
        [MaxLength(100)]
        public string Navn { get; set; } = string.Empty;
        [MaxLength(50)]
        public string? VarenummerInternt { get; set; }
        [MaxLength(50)]
        public string? VarenummerNS { get; set; }

        [Required]
        public int FraksjonsgruppeId { get; set; }
        public int BehandlingsmetodeId { get; set; }
        [Required]
        public int EnhetId { get; set; }

        public bool Aktiv { get; set; } = true;
        public bool FarligAvfall { get; set; } = false;
        [MaxLength(500)]
        public string? Notat { get; set; }

        // Navigasjonsegenskaper (valgfritt, kan inkluderes senere hvis ønskelig)
        
        public Fraksjonsgruppe? Fraksjonsgruppe { get; set; }
        public Behandlingsmetode? Behandlingsmetode { get; set; }
        public Enhet? Enhet { get; set; }


        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}


