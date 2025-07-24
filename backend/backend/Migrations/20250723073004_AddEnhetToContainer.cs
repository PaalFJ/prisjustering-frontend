using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddEnhetToContainer : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "EnhetId",
                table: "Containere",
                type: "int",
                nullable: true); // 👈 gjør feltet nullable, ingen default-verdi

            migrationBuilder.CreateIndex(
                name: "IX_Containere_EnhetId",
                table: "Containere",
                column: "EnhetId");

            migrationBuilder.AddForeignKey(
                name: "FK_Containere_Enheter_EnhetId",
                table: "Containere",
                column: "EnhetId",
                principalTable: "Enheter",
                principalColumn: "id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Containere_Enheter_EnhetId",
                table: "Containere");

            migrationBuilder.DropIndex(
                name: "IX_Containere_EnhetId",
                table: "Containere");

            migrationBuilder.DropColumn(
                name: "EnhetId",
                table: "Containere");
        }
    }
}
