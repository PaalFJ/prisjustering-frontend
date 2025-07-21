using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PrisjusteringProsjekt.Models
{
    public class Mottak
    {
        [Key]
        [Column("id")]
        public int MottakId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Navn { get; set; } = string.Empty;

        [MaxLength(200)]
        public string? Adresse { get; set; }

        [MaxLength(4)]
        public string? Postnummer { get; set; }

        [MaxLength(100)]
        public string? Sted { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
