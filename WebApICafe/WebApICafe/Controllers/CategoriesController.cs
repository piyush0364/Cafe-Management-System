using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApICafe.Models;
using WebApICafe.Services.Interfaces;

namespace WebApICafe.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CategoriesController : ControllerBase
{
    private readonly ICategoryService _categoryService;

    public CategoriesController(ICategoryService categoryService)
    {
        _categoryService = categoryService;
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<Category>>> GetCategories()
    {
        return await _categoryService.GetAllAsync();
    }

    [HttpGet("{id}")]
    [Authorize(Roles = "Admin1256")]
    public async Task<ActionResult<Category>> GetCategory(int id)
    {
        var category = await _categoryService.GetByIdAsync(id);
        if (category == null)
        {
            return NotFound();
        }

        return category;
    }

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
            var isUpdated = await _categoryService.UpdateAsync(id, category);
            if (!isUpdated)
            {
                return NotFound();
            }
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await CategoryExists(id))
            {
                return NotFound();
            }

            throw;
        }

        return NoContent();
    }

    [HttpPost]
    [Authorize(Roles = "Admin1256")]
    public async Task<ActionResult<Category>> PostCategory(Category category)
    {
        await _categoryService.CreateAsync(category);
        return CreatedAtAction(nameof(GetCategory), new { id = category.CategoryId }, category);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin1256")]
    public async Task<IActionResult> DeleteCategory(int id)
    {
        var isDeleted = await _categoryService.DeleteAsync(id);
        if (!isDeleted)
        {
            return NotFound();
        }

        return NoContent();
    }

    private async Task<bool> CategoryExists(int id)
    {
        var category = await _categoryService.GetByIdAsync(id);
        return category is not null;
    }
}
