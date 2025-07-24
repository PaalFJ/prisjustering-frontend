using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using backend.Models;

namespace PrisjusteringProsjekt.Models
{
    public abstract class ArtikkelBase
    {
        [Required]
        [MaxLength(200)]
        [Column("navn")] // behold databasenavn
        public string ArtikkeltekstInternt { get; set; } = string.Empty;

        [MaxLength(100)]
        public string? VarenummerInternt { get; set; }

        public int EnhetId { get; set; }
        public Enhet? Enhet { get; set; }

        [MaxLength(500)]
        public string? Notat { get; set; }

        public bool Aktiv { get; set; } = true;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
