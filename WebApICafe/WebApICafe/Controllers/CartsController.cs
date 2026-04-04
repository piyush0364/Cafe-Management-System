using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApICafe.Models;
using WebApICafe.Services.Interfaces;

namespace WebApICafe.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CartsController : ControllerBase
{
    private readonly ICartService _cartService;

    public CartsController(ICartService cartService)
    {
        _cartService = cartService;
    }

    [HttpGet]
    [Authorize(Roles = "Admin1256")]
    public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
    {
        return await _cartService.GetAllAsync();
    }

    [HttpGet("{id}")]
    [Authorize(Roles = "Admin1256")]
    public async Task<ActionResult<Cart>> GetCart(int id)
    {
        var cart = await _cartService.GetByIdAsync(id);
        if (cart == null)
        {
            return NotFound();
        }

        return cart;
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> PutCart(int id, Cart cart)
    {
        if (id != cart.CartId)
        {
            return BadRequest();
        }

        try
        {
            var isUpdated = await _cartService.UpdateAsync(id, cart);
            if (!isUpdated)
            {
                return NotFound();
            }
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await CartExists(id))
            {
                return NotFound();
            }

            throw;
        }

        return NoContent();
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Cart>> PostCart(Cart cart)
    {
        await _cartService.CreateAsync(cart);
        return CreatedAtAction(nameof(GetCart), new { id = cart.CartId }, cart);
    }

    [HttpDelete("{id}")]
    [Authorize]
    public async Task<IActionResult> DeleteCart(int id)
    {
        var isDeleted = await _cartService.DeleteAsync(id);
        if (!isDeleted)
        {
            return NotFound();
        }

        return NoContent();
    }

    private async Task<bool> CartExists(int id)
    {
        var cart = await _cartService.GetByIdAsync(id);
        return cart is not null;
    }
}
