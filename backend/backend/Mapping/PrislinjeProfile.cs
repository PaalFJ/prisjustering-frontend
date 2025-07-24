// Mapping/PrislinjeProfile.cs
using AutoMapper;
using backend.Dtos.Prislinje;
using backend.Models;
using PrisjusteringProsjekt.Models;

namespace backend.Mapping
{
    /// <summary>
    /// AutoMapper-profil for å mappe mellom Prislinje-entitet og våre DTOer.
    /// </summary>
    public class PrislinjeProfile : Profile
    {
        public PrislinjeProfile()
        {
            // 1) POSTs body → entitet
            CreateMap<CreateFraksjonPrisDto, Prislinje>();

            // 2) Entitet → GET/PUT-response DTO, inkl. ferdigberegninger
            CreateMap<Prislinje, FraksjonPrisDto>()
                .ForMember(d => d.Kostpris1, o => o.MapFrom(s => s.Kostpris1))
                .ForMember(d => d.AdministrasjonsPris, o => o.MapFrom(s => s.AdministrasjonsPris))
                .ForMember(d => d.Kostpris2, o => o.MapFrom(s => s.Kostpris2))
                .ForMember(d => d.EndeligVeiledendePris, o => o.MapFrom(s => s.VeiledendePris));
        }
    }
}
