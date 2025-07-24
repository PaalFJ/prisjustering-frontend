using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations
{
    /// <inheritdoc />
    public partial class AddNavForSlettekontroll : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_PrislinjeHistorikk_ContainerId",
                table: "PrislinjeHistorikk",
                column: "ContainerId");

            migrationBuilder.CreateIndex(
                name: "IX_PrislinjeHistorikk_ContainerTypeId",
                table: "PrislinjeHistorikk",
                column: "ContainerTypeId");

            migrationBuilder.CreateIndex(
                name: "IX_PrislinjeHistorikk_FraksjonId",
                table: "PrislinjeHistorikk",
                column: "FraksjonId");

            migrationBuilder.CreateIndex(
                name: "IX_PrislinjeHistorikk_TransportorId",
                table: "PrislinjeHistorikk",
                column: "TransportorId");

            migrationBuilder.AddForeignKey(
                name: "FK_PrislinjeHistorikk_ContainerTyper_ContainerTypeId",
                table: "PrislinjeHistorikk",
                column: "ContainerTypeId",
                principalTable: "ContainerTyper",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_PrislinjeHistorikk_Containere_ContainerId",
                table: "PrislinjeHistorikk",
                column: "ContainerId",
                principalTable: "Containere",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_PrislinjeHistorikk_Fraksjoner_FraksjonId",
                table: "PrislinjeHistorikk",
                column: "FraksjonId",
                principalTable: "Fraksjoner",
                principalColumn: "id");

            migrationBuilder.AddForeignKey(
                name: "FK_PrislinjeHistorikk_Transportorer_TransportorId",
                table: "PrislinjeHistorikk",
                column: "TransportorId",
                principalTable: "Transportorer",
                principalColumn: "id");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_PrislinjeHistorikk_ContainerTyper_ContainerTypeId",
                table: "PrislinjeHistorikk");

            migrationBuilder.DropForeignKey(
                name: "FK_PrislinjeHistorikk_Containere_ContainerId",
                table: "PrislinjeHistorikk");

            migrationBuilder.DropForeignKey(
                name: "FK_PrislinjeHistorikk_Fraksjoner_FraksjonId",
                table: "PrislinjeHistorikk");

            migrationBuilder.DropForeignKey(
                name: "FK_PrislinjeHistorikk_Transportorer_TransportorId",
                table: "PrislinjeHistorikk");

            migrationBuilder.DropIndex(
                name: "IX_PrislinjeHistorikk_ContainerId",
                table: "PrislinjeHistorikk");

            migrationBuilder.DropIndex(
                name: "IX_PrislinjeHistorikk_ContainerTypeId",
                table: "PrislinjeHistorikk");

            migrationBuilder.DropIndex(
                name: "IX_PrislinjeHistorikk_FraksjonId",
                table: "PrislinjeHistorikk");

            migrationBuilder.DropIndex(
                name: "IX_PrislinjeHistorikk_TransportorId",
                table: "PrislinjeHistorikk");
        }
    }
}
