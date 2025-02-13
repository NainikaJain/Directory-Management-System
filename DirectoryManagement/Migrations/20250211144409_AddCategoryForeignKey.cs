using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace DirectoryManagement.Migrations
{
    /// <inheritdoc />
    public partial class AddCategoryForeignKey : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Businesses_Categories_CategoryID",
                table: "Businesses");

            migrationBuilder.RenameColumn(
                name: "CategoryID",
                table: "Businesses",
                newName: "Category");

            migrationBuilder.RenameIndex(
                name: "IX_Businesses_CategoryID",
                table: "Businesses",
                newName: "IX_Businesses_Category");

            migrationBuilder.AddForeignKey(
                name: "FK_Businesses_Categories_Category",
                table: "Businesses",
                column: "Category",
                principalTable: "Categories",
                principalColumn: "CategoryID",
                onDelete: ReferentialAction.Cascade);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_Businesses_Categories_Category",
                table: "Businesses");

            migrationBuilder.RenameColumn(
                name: "Category",
                table: "Businesses",
                newName: "CategoryID");

            migrationBuilder.RenameIndex(
                name: "IX_Businesses_Category",
                table: "Businesses",
                newName: "IX_Businesses_CategoryID");

            migrationBuilder.AddForeignKey(
                name: "FK_Businesses_Categories_CategoryID",
                table: "Businesses",
                column: "CategoryID",
                principalTable: "Categories",
                principalColumn: "CategoryID",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
