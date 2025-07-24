// Dtos/Prislinje/CreateFraksjonPrisDto.cs
using System;

namespace backend.Dtos.Prislinje
{
    /// <summary>
    /// DTO som klienten POSTer for å opprette en prislinje kun for fraksjon.
    /// </summary>
    public class CreateFraksjonPrisDto
    {
        public int FraksjonId { get; set; }
        public int MottakId { get; set; }
        public DateTime StartDato { get; set; }
        public DateTime? SluttDato { get; set; }

        public decimal? PrisLeverandor { get; set; }
        public decimal? PrisOmlasting { get; set; }
        public decimal? PrisPressing { get; set; }
        public decimal? PrisSortering { get; set; }
        public decimal? PrisKverning { get; set; }
        public decimal? PrisBomavgift { get; set; }
        public decimal? PrisStatsavgift { get; set; }
        public decimal? PrisTransportSluttbehandling { get; set; }
        public decimal? AndreKostnader { get; set; }

        public decimal? AdministrasjonsProsent { get; set; }
        public bool BrukProsentbasertVeiledendePris { get; set; }
        public decimal? VeiledendeProsent { get; set; }
        public bool BrukManuellVeiledendePris { get; set; }
        public decimal? VeiledendePris { get; set; }

        public string? Kommentar { get; set; }
        public string? Notat { get; set; }
    }
}
