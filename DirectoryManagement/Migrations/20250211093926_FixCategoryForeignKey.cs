using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DirectoryManagement.Migrations
{
    /// <inheritdoc />
    public partial class FixCategoryForeignKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Category",
                table: "Businesses");

            migrationBuilder.AddColumn<int>(
                name: "CategoryID",
                table: "Businesses",
                type: "int",
                nullable: false,
                defaultValue: 0);

            migrationBuilder.CreateIndex(
                name: "IX_Businesses_CategoryID",
                table: "Businesses",
                column: "CategoryID");

            migrationBuilder.AddForeignKey(
                name: "FK_Businesses_Categories_CategoryID",
                table: "Businesses",
                column: "CategoryID",
                principalTable: "Categories",
                principalColumn: "CategoryID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Businesses_Categories_CategoryID",
                table: "Businesses");

            migrationBuilder.DropIndex(
                name: "IX_Businesses_CategoryID",
                table: "Businesses");

            migrationBuilder.DropColumn(
                name: "CategoryID",
                table: "Businesses");

            migrationBuilder.AddColumn<string>(
                name: "Category",
                table: "Businesses",
                type: "nvarchar(max)",
                nullable: false,
                defaultValue: "");
        }
    }
}
