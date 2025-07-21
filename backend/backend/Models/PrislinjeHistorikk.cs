using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace PrisjusteringProsjekt.Models
{
    public class PrislinjeHistorikk
    {
        [Key]
        [Column("id")]
        public int PrislinjeHistorikkId { get; set; }

        // 🔁 Kobling til aktiv prislinje
        public int PrislinjeId { get; set; }

        // 👤 Metadata for endringen
        public DateTime EndretTidspunkt { get; set; } = DateTime.UtcNow;
        public string? EndretAv { get; set; }

        public Endringstype Endringstype { get; set; } = Endringstype.Redigering;
        public string? EndringsNotat { get; set; }

        // 🧩 Kobling til artikkel (kun én er i bruk)
        public int? FraksjonId { get; set; }
        public int? LeieId { get; set; }
        public int? SalgsvareId { get; set; }
        public int? GebyrId { get; set; }
        public int? TransportId { get; set; }

        // 🏷 Kontekst
        public int MottakId { get; set; }
        public int? TransportorId { get; set; }
        public int? LeverandorId { get; set; }
        public int? ContainerId { get; set; }
        public int? ContainerTypeId { get; set; }

        // 💰 Prisfelter (nullable)
        public decimal? PrisLeverandor { get; set; }
        public decimal? PrisOmlasting { get; set; }
        public decimal? PrisPressing { get; set; }
        public decimal? PrisSortering { get; set; }
        public decimal? PrisKverning { get; set; }
        public decimal? PrisBomavgift { get; set; }
        public decimal? PrisStatsavgift { get; set; }
        public decimal? PrisTransportSluttbehandling { get; set; }
        public decimal? AndreKostnader { get; set; }

        // 🧮 Kalkulerte verdier
        public decimal Kostpris1 { get; set; }
        public decimal AdministrasjonsProsent { get; set; }
        public decimal AdministrasjonsPris { get; set; }
        public decimal Kostpris2 { get; set; }

        public bool BrukManuellVeiledendePris { get; set; }
        public bool BrukProsentbasertVeiledendePris { get; set; }

        public decimal VeiledendeProsent { get; set; }
        public decimal VeiledendePris { get; set; }

        // 🗒 Merknader
        public string? Kommentar { get; set; }
        public string? Notat { get; set; }

        // 📅 Gyldighetsperiode
        public DateTime StartDato { get; set; }
        public DateTime? SluttDato { get; set; }

        // 📊 Audit
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public DateTime? UpdatedAt { get; set; }
    }
}
