
using System;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using Microsoft.AspNetCore.Mvc.ModelBinding; 

namespace DirectoryManagement.Models
{
    public class Business
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        [BindNever]
        public int BusinessID { get; set; }

        [Required]
        public required string Name { get; set; }
        public required string Address { get; set; }
        public required string City { get; set; }
        public required string State { get; set; }
        public required string ZipCode { get; set; }

        [Phone]
        public required string PhoneNumber { get; set; }

        // Remove the old Category field and use Foreign Key to Category table
        public int CategoryID { get; set; }

        [ForeignKey("CategoryID")]
        public Category? CategoryRef { get; set; }  // Navigation property

        [Url]
        public string? Website { get; set; }
        public decimal Rating { get; set; }
        public DateTime CreatedAt { get; set; } = DateTime.Now;
        public DateTime UpdatedAt { get; set; } = DateTime.Now;
    }
}
