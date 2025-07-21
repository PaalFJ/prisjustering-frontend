using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PrisjusteringProsjekt.Models
{
    public class Container
    {
        [Key]
        [Column("id")]
        public int ContainerId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Navn { get; set; } = string.Empty;

        [Required]
        public int ContainerTypeId { get; set; }

        public ContainerType? ContainerType { get; set; }

        [MaxLength(500)]
        public string? Notat { get; set; }

        public bool Aktiv { get; set; } = true;

        // Du kan legge til flere tekniske spesifikasjoner her senere:
        public double? Volum { get; set; }
        // public double? Lengde { get; set; }
        // public double? Bredde { get; set; }

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
