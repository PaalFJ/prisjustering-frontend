using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddSalgsvare : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Salgsvarer",
                columns: table => new
                {
                    SalgsvareId = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    ErTjeneste = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    ArtikkeltekstOg = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    ArtikkeltekstLeverandor = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    TransportorId = table.Column<int>(type: "int", nullable: true),
                    EnhetId = table.Column<int>(type: "int", nullable: true),
                    Notat = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Aktiv = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Salgsvarer", x => x.SalgsvareId);
                    table.ForeignKey(
                        name: "FK_Salgsvarer_Enheter_EnhetId",
                        column: x => x.EnhetId,
                        principalTable: "Enheter",
                        principalColumn: "id");
                    table.ForeignKey(
                        name: "FK_Salgsvarer_Transportorer_TransportorId",
                        column: x => x.TransportorId,
                        principalTable: "Transportorer",
                        principalColumn: "id");
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Prislinjer_SalgsvareId",
                table: "Prislinjer",
                column: "SalgsvareId");

            migrationBuilder.CreateIndex(
                name: "IX_PrislinjeHistorikk_SalgsvareId",
                table: "PrislinjeHistorikk",
                column: "SalgsvareId");

            migrationBuilder.CreateIndex(
                name: "IX_Salgsvarer_EnhetId",
                table: "Salgsvarer",
                column: "EnhetId");

            migrationBuilder.CreateIndex(
                name: "IX_Salgsvarer_TransportorId",
                table: "Salgsvarer",
                column: "TransportorId");

            migrationBuilder.AddForeignKey(
                name: "FK_PrislinjeHistorikk_Salgsvarer_SalgsvareId",
                table: "PrislinjeHistorikk",
                column: "SalgsvareId",
                principalTable: "Salgsvarer",
                principalColumn: "SalgsvareId");

            migrationBuilder.AddForeignKey(
                name: "FK_Prislinjer_Salgsvarer_SalgsvareId",
                table: "Prislinjer",
                column: "SalgsvareId",
                principalTable: "Salgsvarer",
                principalColumn: "SalgsvareId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PrislinjeHistorikk_Salgsvarer_SalgsvareId",
                table: "PrislinjeHistorikk");

            migrationBuilder.DropForeignKey(
                name: "FK_Prislinjer_Salgsvarer_SalgsvareId",
                table: "Prislinjer");

            migrationBuilder.DropTable(
                name: "Salgsvarer");

            migrationBuilder.DropIndex(
                name: "IX_Prislinjer_SalgsvareId",
                table: "Prislinjer");

            migrationBuilder.DropIndex(
                name: "IX_PrislinjeHistorikk_SalgsvareId",
                table: "PrislinjeHistorikk");
        }
    }
}
