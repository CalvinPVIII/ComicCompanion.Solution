using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ComicCompanion.Migrations
{
    /// <inheritdoc />
    public partial class AddDateTimeToLibrarySync : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<DateTime>(
                name: "LastSynced",
                table: "UserLibrarySyncs",
                type: "timestamp with time zone",
                nullable: false,
                defaultValue: new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified));
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "LastSynced",
                table: "UserLibrarySyncs");
        }
    }
}
