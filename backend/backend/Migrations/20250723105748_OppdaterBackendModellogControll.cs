using System;
using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class OppdaterBackendModellogControll : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Salgsvarer_Enheter_EnhetId",
                table: "Salgsvarer");

            migrationBuilder.RenameColumn(
                name: "SalgsvareId",
                table: "Salgsvarer",
                newName: "id");

            migrationBuilder.RenameColumn(
                name: "ArtikkeltekstOg",
                table: "Salgsvarer",
                newName: "navn");

            migrationBuilder.RenameColumn(
                name: "Navn",
                table: "Leier",
                newName: "navn");

            migrationBuilder.RenameColumn(
                name: "Navn",
                table: "Fraksjoner",
                newName: "navn");

            migrationBuilder.AlterColumn<int>(
                name: "EnhetId",
                table: "Salgsvarer",
                type: "int",
                nullable: false,
                defaultValue: 0,
                oldClrType: typeof(int),
                oldType: "int",
                oldNullable: true);

            migrationBuilder.AddColumn<int>(
                name: "MottakId",
                table: "Salgsvarer",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VarenummerInternt",
                table: "Salgsvarer",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<string>(
                name: "VarenummerLeverandor",
                table: "Salgsvarer",
                type: "longtext",
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "navn",
                table: "Leier",
                type: "varchar(200)",
                maxLength: 200,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(100)",
                oldMaxLength: 100)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddColumn<bool>(
                name: "ErTjeneste",
                table: "Leier",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<bool>(
                name: "ErUtstyr",
                table: "Leier",
                type: "tinyint(1)",
                nullable: false,
                defaultValue: false);

            migrationBuilder.AddColumn<int>(
                name: "TransportorId",
                table: "Leier",
                type: "int",
                nullable: true);

            migrationBuilder.AddColumn<string>(
                name: "VarenummerInternt",
                table: "Leier",
                type: "varchar(100)",
                maxLength: 100,
                nullable: true)
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateTable(
                name: "Gebyrer",
                columns: table => new
                {
                    id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    navn = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    VarenummerInternt = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    EnhetId = table.Column<int>(type: "int", nullable: false),
                    Notat = table.Column<string>(type: "varchar(500)", maxLength: 500, nullable: true)
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    Aktiv = table.Column<bool>(type: "tinyint(1)", nullable: false),
                    CreatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    UpdatedAt = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Gebyrer", x => x.id);
                    table.ForeignKey(
                        name: "FK_Gebyrer_Enheter_EnhetId",
                        column: x => x.EnhetId,
                        principalTable: "Enheter",
                        principalColumn: "id",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.CreateIndex(
                name: "IX_Salgsvarer_MottakId",
                table: "Salgsvarer",
                column: "MottakId");

            migrationBuilder.CreateIndex(
                name: "IX_Prislinjer_GebyrId",
                table: "Prislinjer",
                column: "GebyrId");

            migrationBuilder.CreateIndex(
                name: "IX_Leier_TransportorId",
                table: "Leier",
                column: "TransportorId");

            migrationBuilder.CreateIndex(
                name: "IX_Gebyrer_EnhetId",
                table: "Gebyrer",
                column: "EnhetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Leier_Transportorer_TransportorId",
                table: "Leier",
                column: "TransportorId",
                principalTable: "Transportorer",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Prislinjer_Gebyrer_GebyrId",
                table: "Prislinjer",
                column: "GebyrId",
                principalTable: "Gebyrer",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_Salgsvarer_Enheter_EnhetId",
                table: "Salgsvarer",
                column: "EnhetId",
                principalTable: "Enheter",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_Salgsvarer_Mottak_MottakId",
                table: "Salgsvarer",
                column: "MottakId",
                principalTable: "Mottak",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Leier_Transportorer_TransportorId",
                table: "Leier");

            migrationBuilder.DropForeignKey(
                name: "FK_Prislinjer_Gebyrer_GebyrId",
                table: "Prislinjer");

            migrationBuilder.DropForeignKey(
                name: "FK_Salgsvarer_Enheter_EnhetId",
                table: "Salgsvarer");

            migrationBuilder.DropForeignKey(
                name: "FK_Salgsvarer_Mottak_MottakId",
                table: "Salgsvarer");

            migrationBuilder.DropTable(
                name: "Gebyrer");

            migrationBuilder.DropIndex(
                name: "IX_Salgsvarer_MottakId",
                table: "Salgsvarer");

            migrationBuilder.DropIndex(
                name: "IX_Prislinjer_GebyrId",
                table: "Prislinjer");

            migrationBuilder.DropIndex(
                name: "IX_Leier_TransportorId",
                table: "Leier");

            migrationBuilder.DropColumn(
                name: "MottakId",
                table: "Salgsvarer");

            migrationBuilder.DropColumn(
                name: "VarenummerInternt",
                table: "Salgsvarer");

            migrationBuilder.DropColumn(
                name: "VarenummerLeverandor",
                table: "Salgsvarer");

            migrationBuilder.DropColumn(
                name: "ErTjeneste",
                table: "Leier");

            migrationBuilder.DropColumn(
                name: "ErUtstyr",
                table: "Leier");

            migrationBuilder.DropColumn(
                name: "TransportorId",
                table: "Leier");

            migrationBuilder.DropColumn(
                name: "VarenummerInternt",
                table: "Leier");

            migrationBuilder.RenameColumn(
                name: "id",
                table: "Salgsvarer",
                newName: "SalgsvareId");

            migrationBuilder.RenameColumn(
                name: "navn",
                table: "Salgsvarer",
                newName: "ArtikkeltekstOg");

            migrationBuilder.RenameColumn(
                name: "navn",
                table: "Leier",
                newName: "Navn");

            migrationBuilder.RenameColumn(
                name: "navn",
                table: "Fraksjoner",
                newName: "Navn");

            migrationBuilder.AlterColumn<int>(
                name: "EnhetId",
                table: "Salgsvarer",
                type: "int",
                nullable: true,
                oldClrType: typeof(int),
                oldType: "int");

            migrationBuilder.AlterColumn<string>(
                name: "Navn",
                table: "Leier",
                type: "varchar(100)",
                maxLength: 100,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "varchar(200)",
                oldMaxLength: 200)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AddForeignKey(
                name: "FK_Salgsvarer_Enheter_EnhetId",
                table: "Salgsvarer",
                column: "EnhetId",
                principalTable: "Enheter",
                principalColumn: "id");
        }
    }
}
