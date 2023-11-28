using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ComicCompanion.Migrations
{
    /// <inheritdoc />
    public partial class AddRatingToReadingList : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<int>(
                name: "Rating",
                table: "ReadingLists",
                type: "integer",
                nullable: false,
                defaultValue: 0);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Rating",
                table: "ReadingLists");
        }
    }
}
