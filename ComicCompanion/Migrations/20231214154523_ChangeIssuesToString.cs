using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ComicCompanion.Migrations
{
    /// <inheritdoc />
    public partial class ChangeIssuesToString : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Issue");

            migrationBuilder.AddColumn<string>(
                name: "SerializedIssues",
                table: "ReadingLists",
                type: "text",
                nullable: false,
                defaultValue: "");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "SerializedIssues",
                table: "ReadingLists");

            migrationBuilder.CreateTable(
                name: "Issue",
                columns: table => new
                {
                    IssueId = table.Column<string>(type: "text", nullable: false),
                    ComicId = table.Column<string>(type: "text", nullable: false),
                    Pages = table.Column<string[]>(type: "text[]", nullable: true),
                    ReadingListId = table.Column<int>(type: "integer", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Issue", x => x.IssueId);
                    table.ForeignKey(
                        name: "FK_Issue_ReadingLists_ReadingListId",
                        column: x => x.ReadingListId,
                        principalTable: "ReadingLists",
                        principalColumn: "ReadingListId");
                });

            migrationBuilder.CreateIndex(
                name: "IX_Issue_ReadingListId",
                table: "Issue",
                column: "ReadingListId");
        }
    }
}
