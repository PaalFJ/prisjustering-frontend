using PrisjusteringProsjekt.Models;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;

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

    [Required] // 👈 Nytt felt: kobling til Enhet
    public int? EnhetId { get; set; }
    public Enhet? Enhet { get; set; }

    [MaxLength(500)]
    public string? Notat { get; set; }

    public bool Aktiv { get; set; } = true;
    public double? Volum { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    public DateTime? UpdatedAt { get; set; }

    // Navigasjon
    public ICollection<Leie>? Leier { get; set; }
    public ICollection<Prislinje>? Prislinjer { get; set; }
    public ICollection<PrislinjeHistorikk>? PrislinjeHistorikk { get; set; }
}
