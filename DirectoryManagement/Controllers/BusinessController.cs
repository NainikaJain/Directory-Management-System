using Microsoft.AspNetCore.Mvc;
using DirectoryManagement.Data;
using DirectoryManagement.Models;
using Microsoft.EntityFrameworkCore;

namespace DirectoryManagement.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class BusinessController : ControllerBase
    {
        private readonly DirectoryDbContext _context;

        public BusinessController(DirectoryDbContext context)
        {
            _context = context;
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<object>>> GetBusinesses()
        {
            var businesses = await _context.Businesses
                .Include(b => b.CategoryRef) // Ensure Correct Navigation Property
                .Select(b => new 
                {
                    b.BusinessID,
                    b.Name,
                    b.City,
                    b.State,
                    b.PhoneNumber,
                    CategoryName = b.CategoryRef != null ? b.CategoryRef.Name : "Unknown",  // Get Category Name
                    b.Website,
                    b.Rating,
                    b.CreatedAt,
                    b.UpdatedAt
                })
                .ToListAsync();

            return Ok(businesses);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<object>> GetBusiness(int id)
        {
            var business = await _context.Businesses
                .Include(b => b.CategoryRef)
                .Where(b => b.BusinessID == id)
                .Select(b => new
                {
                    b.BusinessID,
                    b.Name,
                    b.City,
                    b.State,
                    b.PhoneNumber,
                    CategoryName = b.CategoryRef != null ? b.CategoryRef.Name : "Unknown",
                    b.Website,
                    b.Rating,
                    b.CreatedAt,
                    b.UpdatedAt
                })
                .FirstOrDefaultAsync();

            if (business == null) return NotFound();
            return Ok(business);
        }


        [HttpPost]
        public async Task<ActionResult<Business>> CreateBusiness(Business business)
        {
            var existingCategory = await _context.Categories.FindAsync(business.CategoryID);
            
            if (existingCategory == null)
            {
                return BadRequest("Invalid CategoryID. Category does not exist.");
            }

            //business.CategoryRef = existingCategory; // Assign existing category
            business.CategoryID = existingCategory.CategoryID;
            _context.Businesses.Add(business);
            await _context.SaveChangesAsync();

            return CreatedAtAction(nameof(GetBusiness), new { id = business.BusinessID }, business);
        }


        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateBusiness(int id, Business business)
        {
            if (id != business.BusinessID) return BadRequest();

            _context.Entry(business).State = EntityState.Modified;
            await _context.SaveChangesAsync();
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteBusiness(int id)
        {
            var business = await _context.Businesses.FindAsync(id);
            if (business == null) return NotFound();

            _context.Businesses.Remove(business);
            await _context.SaveChangesAsync();
            return NoContent();
        }
    }
}
