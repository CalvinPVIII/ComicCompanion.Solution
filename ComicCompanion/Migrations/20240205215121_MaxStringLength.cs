using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ComicCompanion.Migrations
{
    /// <inheritdoc />
    public partial class MaxStringLength : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "ReadingLists",
                type: "character varying(50)",
                maxLength: 50,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "ReadingLists",
                type: "character varying(250)",
                maxLength: 250,
                nullable: false,
                oldClrType: typeof(string),
                oldType: "text");

            migrationBuilder.CreateIndex(
                name: "IX_UserReadingListFavorites_ReadingListId",
                table: "UserReadingListFavorites",
                column: "ReadingListId");

            migrationBuilder.CreateIndex(
                name: "IX_UserReadingListFavorites_UserId",
                table: "UserReadingListFavorites",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_UserReadingListFavorites_AspNetUsers_UserId",
                table: "UserReadingListFavorites",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);

            migrationBuilder.AddForeignKey(
                name: "FK_UserReadingListFavorites_ReadingLists_ReadingListId",
                table: "UserReadingListFavorites",
                column: "ReadingListId",
                principalTable: "ReadingLists",
                principalColumn: "ReadingListId",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_UserReadingListFavorites_AspNetUsers_UserId",
                table: "UserReadingListFavorites");

            migrationBuilder.DropForeignKey(
                name: "FK_UserReadingListFavorites_ReadingLists_ReadingListId",
                table: "UserReadingListFavorites");

            migrationBuilder.DropIndex(
                name: "IX_UserReadingListFavorites_ReadingListId",
                table: "UserReadingListFavorites");

            migrationBuilder.DropIndex(
                name: "IX_UserReadingListFavorites_UserId",
                table: "UserReadingListFavorites");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "ReadingLists",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(50)",
                oldMaxLength: 50);

            migrationBuilder.AlterColumn<string>(
                name: "Description",
                table: "ReadingLists",
                type: "text",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "character varying(250)",
                oldMaxLength: 250);
        }
    }
}
