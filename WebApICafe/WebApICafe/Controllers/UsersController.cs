using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApICafe.Models;
using WebApICafe.Services.Interfaces;

namespace WebApICafe.Controllers;

[Route("api/[controller]")]
[ApiController]
public class UsersController : ControllerBase
{
    private readonly IUserService _userService;

    public UsersController(IUserService userService)
    {
        _userService = userService;
    }

    [HttpGet]
    [Authorize(Roles = "Admin1256")]
    public async Task<ActionResult<IEnumerable<User>>> GetUsers()
    {
        return await _userService.GetAllAsync();
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<User>> GetUser(int id)
    {
        var user = await _userService.GetByIdAsync(id);
        if (user == null)
        {
            return NotFound();
        }

        return user;
    }

    [HttpPut("{id}")]
    [Authorize(Roles = "Admin1256")]
    public async Task<IActionResult> PutUser(int id, User user)
    {
        if (id != user.UserId)
        {
            return BadRequest();
        }

        try
        {
            var isUpdated = await _userService.UpdateAsync(id, user);
            if (!isUpdated)
            {
                return NotFound();
            }
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await UserExists(id))
            {
                return NotFound();
            }

            throw;
        }

        return NoContent();
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<User>> PostUser(User user)
    {
        await _userService.CreateAsync(user);
        return CreatedAtAction(nameof(GetUser), new { id = user.UserId }, user);
    }

    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteUser(int id)
    {
        var isDeleted = await _userService.DeleteAsync(id);
        if (!isDeleted)
        {
            return NotFound();
        }

        return NoContent();
    }

    private async Task<bool> UserExists(int id)
    {
        var user = await _userService.GetByIdAsync(id);
        return user is not null;
    }
}
