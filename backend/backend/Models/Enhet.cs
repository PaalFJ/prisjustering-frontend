using PrisjusteringProsjekt.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace PrisjusteringProsjekt.Models
{
public class Enhet
{
    [Key]
    [Column("id")]
    public int EnhetId { get; set; }

        [Required]
        [MaxLength(20)]
        public string Navn { get; set; } = string.Empty;


        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        public ICollection<Fraksjon>? Fraksjoner { get; set; }
        public ICollection<Leie>? Leier { get; set; }
    }

}