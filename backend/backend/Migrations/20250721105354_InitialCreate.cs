using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class InitialCreate : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Behandlingsmetoder",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Navn = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Behandlingsmetoder", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "ContainerTyper",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Navn = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ContainerTyper", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Enheter",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Navn = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Enheter", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Fraksjonsgrupper",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Navn = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fraksjonsgrupper", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Leverandorer",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Navn = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Notat = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Leverandorer", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Mottak",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Navn = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Adresse = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Postnummer = table.Column<string>(type: "varchar(4)", maxLength: 4, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Sted = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Mottak", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "PrislinjeHistorikk",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    PrislinjeId = table.Column<int>(type: "int", nullable: false),
                    EndretTidspunkt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    EndretAv = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Endringstype = table.Column<int>(type: "int", nullable: false),
                    EndringsNotat = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FraksjonId = table.Column<int>(type: "int", nullable: true),
                    LeieId = table.Column<int>(type: "int", nullable: true),
                    SalgsvareId = table.Column<int>(type: "int", nullable: true),
                    GebyrId = table.Column<int>(type: "int", nullable: true),
                    TransportId = table.Column<int>(type: "int", nullable: true),
                    MottakId = table.Column<int>(type: "int", nullable: false),
                    TransportorId = table.Column<int>(type: "int", nullable: true),
                    LeverandorId = table.Column<int>(type: "int", nullable: true),
                    ContainerId = table.Column<int>(type: "int", nullable: true),
                    ContainerTypeId = table.Column<int>(type: "int", nullable: true),
                    PrisLeverandor = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    PrisOmlasting = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    PrisPressing = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    PrisSortering = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    PrisKverning = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    PrisBomavgift = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    PrisStatsavgift = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    PrisTransportSluttbehandling = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    AndreKostnader = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    Kostpris1 = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    AdministrasjonsProsent = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    AdministrasjonsPris = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Kostpris2 = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    BrukManuellVeiledendePris = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    BrukProsentbasertVeiledendePris = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    VeiledendeProsent = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    VeiledendePris = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Kommentar = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Notat = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    StartDato = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    SluttDato = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_PrislinjeHistorikk", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Transportorer",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Navn = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Notat = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Transportorer", x => x.id);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Containere",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Navn = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ContainerTypeId = table.Column<int>(type: "int", nullable: false),
                    Notat = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Aktiv = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Volum = table.Column<double>(type: "double", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Containere", x => x.id);
                    table.ForeignKey(
                        name: "FK_Containere_ContainerTyper_ContainerTypeId",
                        column: x => x.ContainerTypeId,
                        principalTable: "ContainerTyper",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Fraksjoner",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Navn = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    VarenummerInternt = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    VarenummerNS = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    FraksjonsgruppeId = table.Column<int>(type: "int", nullable: false),
                    BehandlingsmetodeId = table.Column<int>(type: "int", nullable: false),
                    EnhetId = table.Column<int>(type: "int", nullable: false),
                    Aktiv = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    FarligAvfall = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Notat = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Fraksjoner", x => x.id);
                    table.ForeignKey(
                        name: "FK_Fraksjoner_Behandlingsmetoder_BehandlingsmetodeId",
                        column: x => x.BehandlingsmetodeId,
                        principalTable: "Behandlingsmetoder",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Fraksjoner_Enheter_EnhetId",
                        column: x => x.EnhetId,
                        principalTable: "Enheter",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Fraksjoner_Fraksjonsgrupper_FraksjonsgruppeId",
                        column: x => x.FraksjonsgruppeId,
                        principalTable: "Fraksjonsgrupper",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Leier",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Navn = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EnhetId = table.Column<int>(type: "int", nullable: false),
                    Aktiv = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    Notat = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    LeverandorId = table.Column<int>(type: "int", nullable: true),
                    ContainerTypeId = table.Column<int>(type: "int", nullable: true),
                    ContainerId = table.Column<int>(type: "int", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Leier", x => x.id);
                    table.ForeignKey(
                        name: "FK_Leier_ContainerTyper_ContainerTypeId",
                        column: x => x.ContainerTypeId,
                        principalTable: "ContainerTyper",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Leier_Containere_ContainerId",
                        column: x => x.ContainerId,
                        principalTable: "Containere",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Leier_Enheter_EnhetId",
                        column: x => x.EnhetId,
                        principalTable: "Enheter",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Leier_Leverandorer_LeverandorId",
                        column: x => x.LeverandorId,
                        principalTable: "Leverandorer",
                        principalColumn: "id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Prislinjer",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    FraksjonId = table.Column<int>(type: "int", nullable: true),
                    LeieId = table.Column<int>(type: "int", nullable: true),
                    SalgsvareId = table.Column<int>(type: "int", nullable: true),
                    GebyrId = table.Column<int>(type: "int", nullable: true),
                    TransportId = table.Column<int>(type: "int", nullable: true),
                    MottakId = table.Column<int>(type: "int", nullable: false),
                    TransportorId = table.Column<int>(type: "int", nullable: true),
                    LeverandorId = table.Column<int>(type: "int", nullable: true),
                    ContainerId = table.Column<int>(type: "int", nullable: true),
                    ContainerTypeId = table.Column<int>(type: "int", nullable: true),
                    PrisLeverandor = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    PrisOmlasting = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    PrisPressing = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    PrisSortering = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    PrisKverning = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    PrisBomavgift = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    PrisStatsavgift = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    PrisTransportSluttbehandling = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    AndreKostnader = table.Column<decimal>(type: "decimal(65,30)", nullable: true),
                    Kostpris1 = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    AdministrasjonsProsent = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    AdministrasjonsPris = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Kostpris2 = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    BrukManuellVeiledendePris = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    BrukProsentbasertVeiledendePris = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    VeiledendeProsent = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    VeiledendePris = table.Column<decimal>(type: "decimal(65,30)", nullable: false),
                    Kommentar = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Notat = table.Column<string>(type: "longtext", nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    StartDato = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    SluttDato = table.Column<DateTime>(type: "datetime(6)", nullable: true),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Prislinjer", x => x.id);
                    table.ForeignKey(
                        name: "FK_Prislinjer_ContainerTyper_ContainerTypeId",
                        column: x => x.ContainerTypeId,
                        principalTable: "ContainerTyper",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Prislinjer_Containere_ContainerId",
                        column: x => x.ContainerId,
                        principalTable: "Containere",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Prislinjer_Fraksjoner_FraksjonId",
                        column: x => x.FraksjonId,
                        principalTable: "Fraksjoner",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Prislinjer_Leier_LeieId",
                        column: x => x.LeieId,
                        principalTable: "Leier",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Prislinjer_Leverandorer_LeverandorId",
                        column: x => x.LeverandorId,
                        principalTable: "Leverandorer",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Prislinjer_Mottak_MottakId",
                        column: x => x.MottakId,
                        principalTable: "Mottak",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                    table.ForeignKey(
                        name: "FK_Prislinjer_Transportorer_TransportorId",
                        column: x => x.TransportorId,
                        principalTable: "Transportorer",
                        principalColumn: "id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Containere_ContainerTypeId",
                table: "Containere",
                column: "ContainerTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Fraksjoner_BehandlingsmetodeId",
                table: "Fraksjoner",
                column: "BehandlingsmetodeId");

            migrationBuilder.CreateIndex(
                name: "IX_Fraksjoner_EnhetId",
                table: "Fraksjoner",
                column: "EnhetId");

            migrationBuilder.CreateIndex(
                name: "IX_Fraksjoner_FraksjonsgruppeId",
                table: "Fraksjoner",
                column: "FraksjonsgruppeId");

            migrationBuilder.CreateIndex(
                name: "IX_Leier_ContainerId",
                table: "Leier",
                column: "ContainerId");

            migrationBuilder.CreateIndex(
                name: "IX_Leier_ContainerTypeId",
                table: "Leier",
                column: "ContainerTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Leier_EnhetId",
                table: "Leier",
                column: "EnhetId");

            migrationBuilder.CreateIndex(
                name: "IX_Leier_LeverandorId",
                table: "Leier",
                column: "LeverandorId");

            migrationBuilder.CreateIndex(
                name: "IX_Prislinjer_ContainerId",
                table: "Prislinjer",
                column: "ContainerId");

            migrationBuilder.CreateIndex(
                name: "IX_Prislinjer_ContainerTypeId",
                table: "Prislinjer",
                column: "ContainerTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_Prislinjer_FraksjonId",
                table: "Prislinjer",
                column: "FraksjonId");

            migrationBuilder.CreateIndex(
                name: "IX_Prislinjer_LeieId",
                table: "Prislinjer",
                column: "LeieId");

            migrationBuilder.CreateIndex(
                name: "IX_Prislinjer_LeverandorId",
                table: "Prislinjer",
                column: "LeverandorId");

            migrationBuilder.CreateIndex(
                name: "IX_Prislinjer_MottakId",
                table: "Prislinjer",
                column: "MottakId");

            migrationBuilder.CreateIndex(
                name: "IX_Prislinjer_TransportorId",
                table: "Prislinjer",
                column: "TransportorId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "PrislinjeHistorikk");

            migrationBuilder.DropTable(
                name: "Prislinjer");

            migrationBuilder.DropTable(
                name: "Fraksjoner");

            migrationBuilder.DropTable(
                name: "Leier");

            migrationBuilder.DropTable(
                name: "Mottak");

            migrationBuilder.DropTable(
                name: "Transportorer");

            migrationBuilder.DropTable(
                name: "Behandlingsmetoder");

            migrationBuilder.DropTable(
                name: "Fraksjonsgrupper");

            migrationBuilder.DropTable(
                name: "Containere");

            migrationBuilder.DropTable(
                name: "Enheter");

            migrationBuilder.DropTable(
                name: "Leverandorer");

            migrationBuilder.DropTable(
                name: "ContainerTyper");
        }
    }
}
