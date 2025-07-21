using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PrisjusteringProsjekt.Models
{
    public class Leie
    {
        [Key]
        [Column("id")]
        public int LeieId { get; set; }

        [Required]
        [MaxLength(100)]
        public string Navn { get; set; } = string.Empty;

        [Required]
        public int EnhetId { get; set; }

        public bool Aktiv { get; set; } = true;

        [MaxLength(500)]
        public string? Notat { get; set; }

        public int? LeverandorId { get; set; }
        public Leverandor? Leverandor { get; set; }

        // Navigasjon
        public Enhet? Enhet { get; set; }

        
        public int? ContainerTypeId { get; set; }

        public ContainerType? ContainerType { get; set; }

        public int? ContainerId { get; set; }
        public Container? Container { get; set; }


        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
