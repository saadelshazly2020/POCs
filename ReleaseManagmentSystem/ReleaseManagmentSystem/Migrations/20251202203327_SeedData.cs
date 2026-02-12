using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace ReleaseManagmentSystem.Migrations
{
    /// <inheritdoc />
    public partial class SeedData : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.InsertData(
                table: "Releases",
                columns: new[] { "Id", "AssignedTeam", "CreatedBy", "CreatedDate", "Name", "Note", "Project", "Status", "UpdatedDate" },
                values: new object[,]
                {
                    { 1, "Team A", "Admin", new DateTime(2025, 12, 2, 23, 33, 27, 637, DateTimeKind.Local).AddTicks(3170), "Initial Release", "First release of the project.", "Project Alpha", "Completed", null },
                    { 2, "Team B", "Admin", new DateTime(2025, 12, 2, 23, 33, 27, 637, DateTimeKind.Local).AddTicks(3191), "Second Release", "Working on the second release.", "Project Beta", "In Progress", null }
                });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Releases",
                keyColumn: "Id",
                keyValue: 1);

            migrationBuilder.DeleteData(
                table: "Releases",
                keyColumn: "Id",
                keyValue: 2);
        }
    }
}
