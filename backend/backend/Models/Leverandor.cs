using PrisjusteringProsjekt.Models;
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
        public string Navn { get; set; }

        public string? Notat { get; set; }


        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
