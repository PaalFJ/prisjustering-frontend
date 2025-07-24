using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PrisjusteringProsjekt.Models
{
    public class Transportor
    {
        [Key]
        [Column("id")]
        public int TransportorId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Navn { get; set; } = string.Empty;

        [MaxLength(500)]
        public string? Notat { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        // Navigasjon
        public ICollection<Prislinje>? Prislinjer { get; set; }
        public ICollection<PrislinjeHistorikk>? PrislinjeHistorikk { get; set; }
    }
}
