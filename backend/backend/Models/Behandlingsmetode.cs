using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PrisjusteringProsjekt.Models
{
    public class Behandlingsmetode
    {
        [Key]
        [Column("id")]
        public int BehandlingsMetodeId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Navn { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Navigasjon – Fraksjoner som bruker denne metoden
        public ICollection<Fraksjon>? Fraksjoner { get; set; }
    }
}
