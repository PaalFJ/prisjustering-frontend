using Microsoft.EntityFrameworkCore;

using PrisjusteringProsjekt.Models;

namespace backend.Data
{
    public class AppDbContext : DbContext
    {
        public AppDbContext(DbContextOptions<AppDbContext> options) : base(options) { }

        public DbSet<Enhet> Enheter { get; set; }
        public DbSet<Mottak> Mottak { get; set; }
        public DbSet<Fraksjonsgruppe> Fraksjonsgrupper { get; set; }

        public DbSet<Behandlingsmetode> Behandlingsmetoder { get; set; }
        public DbSet<Fraksjon> Fraksjoner { get; set; }
        public DbSet<Prislinje> Prislinjer { get; set; }
        public DbSet<PrislinjeHistorikk> PrislinjeHistorikk { get; set; }
        public DbSet<Leie> Leier { get; set; }

        public DbSet<Leverandor> Leverandorer { get; set; }
        public DbSet<Transportor> Transportorer { get; set; }
        public DbSet<ContainerType> ContainerTyper { get; set; }
        public DbSet<Container> Containere { get; set; }


    }
}
