using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using PrisjusteringProsjekt.Models;

namespace PrisjusteringProsjekt.Models
{
    public class Prislinje
    {
        [Key]
        [Column("id")]
        public int PrislinjeId { get; set; }

        // 📦 Kobling til én av artikkeltypene (bare én skal ha verdi)
        public int? FraksjonId { get; set; }
        public int? LeieId { get; set; }
        public int? SalgsvareId { get; set; }
        public int? GebyrId { get; set; }
        public int? TransportId { get; set; }

        // 🔗 Kontekst – hvilken sammenheng gjelder prisen?
        [Required]
        public int MottakId { get; set; }
        public int? TransportorId { get; set; }
        public int? LeverandorId { get; set; }
        public int? ContainerId { get; set; }
        public int? ContainerTypeId { get; set; }

        // 💰 Prisfeltene som utgjør Kostpris 1
        public decimal? PrisLeverandor { get; set; }
        public decimal? PrisOmlasting { get; set; }
        public decimal? PrisPressing { get; set; }
        public decimal? PrisSortering { get; set; }
        public decimal? PrisKverning { get; set; }
        public decimal? PrisBomavgift { get; set; }
        public decimal? PrisStatsavgift { get; set; }
        public decimal? PrisTransportSluttbehandling { get; set; }
        public decimal? AndreKostnader { get; set; }

        // 🧮 Kalkulert prisstruktur
        public decimal Kostpris1 { get; set; }

        public decimal AdministrasjonsProsent { get; set; }  // f.eks. 10 for 10 %
        public decimal AdministrasjonsPris { get; set; }     // Kostpris1 * prosent

        public decimal Kostpris2 { get; set; }               // Kostpris1 + AdministrasjonsPris

        // 🎯 Veiledende prislogikk
        public bool BrukManuellVeiledendePris { get; set; } = false;
        public bool BrukProsentbasertVeiledendePris { get; set; } = false;

        public decimal VeiledendeProsent { get; set; }       // f.eks. 30 for 30 %
        public decimal VeiledendePris { get; set; }          // Endelig pris

        // 📝 Frie merknader
        public string? Kommentar { get; set; }
        public string? Notat { get; set; }

        [NotMapped]
        public string? EndringsNotat { get; set; }

        // 📅 Gyldighet
        [Required]
        public DateTime StartDato { get; set; }
        public DateTime? SluttDato { get; set; }

        // 🔁 Navigasjonsegenskaper (brukes i API og UI)
        public Fraksjon? Fraksjon { get; set; }
        public Leie? Leie { get; set; }
        public Mottak? Mottak { get; set; }
        public Leverandor? Leverandor { get; set; }
        public Transportor? Transportor { get; set; }
        public Container? Container { get; set; }
        public ContainerType? ContainerType { get; set; }

        // 📊 Audit
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
