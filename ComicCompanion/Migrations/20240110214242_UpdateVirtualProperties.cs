using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ComicCompanion.Migrations
{
    /// <inheritdoc />
    public partial class UpdateVirtualProperties : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateIndex(
                name: "IX_ReadingListRatings_ReadingListId",
                table: "ReadingListRatings",
                column: "ReadingListId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReadingListRatings_ReadingLists_ReadingListId",
                table: "ReadingListRatings",
                column: "ReadingListId",
                principalTable: "ReadingLists",
                principalColumn: "ReadingListId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReadingListRatings_ReadingLists_ReadingListId",
                table: "ReadingListRatings");

            migrationBuilder.DropIndex(
                name: "IX_ReadingListRatings_ReadingListId",
                table: "ReadingListRatings");
        }
    }
}
