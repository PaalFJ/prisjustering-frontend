using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PrisjusteringProsjekt.Models
{
    public class Leverandor
    {
        [Key]
        [Column("id")]
        public int LeverandorId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Navn { get; set; } = string.Empty;

        public string? Notat { get; set; }

        // Navigasjon: Leier og Prislinjer som bruker denne leverandøren
        public ICollection<Leie> Leier { get; set; } = new List<Leie>();
        public ICollection<Prislinje> Prislinjer { get; set; } = new List<Prislinje>();

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}