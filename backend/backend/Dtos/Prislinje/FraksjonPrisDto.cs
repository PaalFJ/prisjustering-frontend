// Dtos/Prislinje/FraksjonPrisDto.cs
using System;

namespace backend.Dtos.Prislinje
{
    /// <summary>
    /// DTO som returneres ved GET og PUT for en fraksjons-prislinje:
    /// inkluderer både input-felter og ferdigberegnede prisfelt.
    /// </summary>
    public class FraksjonPrisDto : CreateFraksjonPrisDto
    {
        public int PrislinjeId { get; set; }

        /// <summary>Kostpris 1 = sum av alle kostnadskomponenter.</summary>
        public decimal Kostpris1 { get; set; }

        /// <summary>AdministrasjonsPris = prosent-påslag av Kostpris1.</summary>
        public decimal AdministrasjonsPris { get; set; }

        /// <summary>Kostpris2 = Kostpris1 + AdministrasjonsPris.</summary>
        public decimal Kostpris2 { get; set; }

        /// <summary>Endelig veiledende pris, evt. manuelt overstyrt.</summary>
        public decimal EndeligVeiledendePris { get; set; }
    }
}
