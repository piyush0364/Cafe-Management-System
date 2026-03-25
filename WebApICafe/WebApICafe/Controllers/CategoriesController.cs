using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApICafe.Models;
using WebApICafe.Repositories;

namespace WebApICafe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CategoriesController : ControllerBase
    {
        private readonly IRepository<Category> _categories;

        public CategoriesController(IRepository<Category> categories)
        {
            _categories = categories;
        }

        // GET: api/Categories
        [HttpGet]

        public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
        {
            return Ok(await _categories.GetAllAsync());
        }

        // GET: api/Categories/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin1256")]
        public async Task<ActionResult<Category>> GetCategory(int id)
        {
            var category = await _categories.GetByIdAsync(id);

            if (category == null)
            {
                return NotFound();
            }

            return category;
        }

        // PUT: api/Categories/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin1256")]
        public async Task<IActionResult> PutCategory(int id, Category category)
        {
            if (id != category.CategoryId)
            {
                return BadRequest();
            }

            try
            {
                await _categories.UpdateAsync(category);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _categories.ExistsAsync(e => e.CategoryId == id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        // POST: api/Categories
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize(Roles = "Admin1256")]
        public async Task<ActionResult<Category>> PostCategory(Category category)
        {
            await _categories.AddAsync(category);

            return CreatedAtAction("GetCategory", new { id = category.CategoryId }, category);
        }

        // DELETE: api/Categories/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin1256")]
        public async Task<IActionResult> DeleteCategory(int id)
        {
            var category = await _categories.GetByIdAsync(id);
            if (category == null)
            {
                return NotFound();
            }

            await _categories.DeleteAsync(category);

            return NoContent();
        }
    }
}
