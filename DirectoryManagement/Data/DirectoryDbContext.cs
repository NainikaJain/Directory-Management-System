// using Microsoft.EntityFrameworkCore;
// using DirectoryManagement.Models;

// namespace DirectoryManagement.Data
// {
//     public class DirectoryDbContext : DbContext
//     {
//         public DirectoryDbContext(DbContextOptions<DirectoryDbContext> options) : base(options) { }

//         public DbSet<Category> Categories { get; set; }
//         public DbSet<Business> Businesses { get; set; }
//     }
// }





using Microsoft.EntityFrameworkCore;
using DirectoryManagement.Models;

namespace DirectoryManagement.Data
{
    public class DirectoryDbContext : DbContext
    {
        public DirectoryDbContext(DbContextOptions<DirectoryDbContext> options) : base(options) { }

        public DbSet<Business> Businesses { get; set; }
        public DbSet<Category> Categories { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<Business>()
                .HasOne(b => b.CategoryRef)  // Establish Relationship
                .WithMany()
                .HasForeignKey(b => b.CategoryID)
                .OnDelete(DeleteBehavior.Restrict); // Prevent accidental deletion
        }
    }
}

