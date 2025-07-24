using PrisjusteringProsjekt.Models;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PrisjusteringProsjekt.Models
{
    public class ContainerType
    {
        [Key]
        [Column("id")]
        public int ContainerTypeId { get; set; }
        [Required]
        [MaxLength(100)]
        public string Navn { get; set; } = string.Empty;

        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }

        public ICollection<Container>? Containere { get; set; }
        public ICollection<Leie>? Leier { get; set; }
        public ICollection<Prislinje>? Prislinjer { get; set; }
        public ICollection<PrislinjeHistorikk>? PrislinjeHistorikk { get; set; }



    }

}

