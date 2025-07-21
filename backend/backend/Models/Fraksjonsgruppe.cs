using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;


namespace PrisjusteringProsjekt.Models
{

    public class Fraksjonsgruppe
    {
        [Key]
        [Column("id")]
        public int FraksjonsgruppeId { get; set; }

        [Required]
        [MaxLength(50)]
        public string Navn { get; set; } = string.Empty;


        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }

}

