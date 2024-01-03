using Microsoft.EntityFrameworkCore.Migrations;
using Npgsql.EntityFrameworkCore.PostgreSQL.Metadata;

#nullable disable

namespace ComicCompanion.Migrations
{
    /// <inheritdoc />
    public partial class ReadingListCoverImg : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "ReadingLists");

            migrationBuilder.AddColumn<string>(
                name: "CoverImg",
                table: "ReadingLists",
                type: "text",
                nullable: false,
                defaultValue: "");

            migrationBuilder.CreateTable(
                name: "ReadingListRatings",
                columns: table => new
                {
                    ReadingListRatingId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    ReadingListId = table.Column<int>(type: "integer", nullable: false),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    Positive = table.Column<bool>(type: "boolean", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_ReadingListRatings", x => x.ReadingListRatingId);
                });

            migrationBuilder.CreateTable(
                name: "UserReadingListFavorites",
                columns: table => new
                {
                    UserReadingListFavoriteId = table.Column<int>(type: "integer", nullable: false)
                        .Annotation("Npgsql:ValueGenerationStrategy", NpgsqlValueGenerationStrategy.IdentityByDefaultColumn),
                    UserId = table.Column<string>(type: "text", nullable: false),
                    ReadingListId = table.Column<int>(type: "integer", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_UserReadingListFavorites", x => x.UserReadingListFavoriteId);
                });

            migrationBuilder.CreateIndex(
                name: "IX_ReadingLists_UserId",
                table: "ReadingLists",
                column: "UserId");

            migrationBuilder.AddForeignKey(
                name: "FK_ReadingLists_AspNetUsers_UserId",
                table: "ReadingLists",
                column: "UserId",
                principalTable: "AspNetUsers",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReadingLists_AspNetUsers_UserId",
                table: "ReadingLists");

            migrationBuilder.DropTable(
                name: "ReadingListRatings");

            migrationBuilder.DropTable(
                name: "UserReadingListFavorites");

            migrationBuilder.DropIndex(
                name: "IX_ReadingLists_UserId",
                table: "ReadingLists");

            migrationBuilder.DropColumn(
                name: "CoverImg",
                table: "ReadingLists");

            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "ReadingLists",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }
    }
}
