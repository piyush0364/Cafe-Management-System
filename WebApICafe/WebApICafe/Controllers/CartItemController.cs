using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApICafe.Dto;
using WebApICafe.Services.Interfaces;

namespace WebApICafe.Controllers;

[Route("api/[controller]")]
[ApiController]
public class CartitemController : ControllerBase
{
    private readonly ICartItemService _cartItemService;

    public CartitemController(ICartItemService cartItemService)
    {
        _cartItemService = cartItemService;
    }

    [HttpGet("{userId}")]
    [Authorize]
    public async Task<ActionResult<IEnumerable<CartItemDto>>> GetCartItems(int userId)
    {
        var cartItems = await _cartItemService.GetForUserAsync(userId);
        return Ok(cartItems);
    }
}
