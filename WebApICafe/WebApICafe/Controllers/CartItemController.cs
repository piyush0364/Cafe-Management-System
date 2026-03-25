using System.Collections.Generic;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using WebApICafe.Dto;
using WebApICafe.Repositories;

namespace WebAPI_cafe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartitemController : ControllerBase
    {
        private readonly ICartRepository _carts;

        public CartitemController(ICartRepository carts)
        {
            _carts = carts;
        }

        [HttpGet("{userId}")]
        [Authorize]
        public async Task<ActionResult<IEnumerable<CartItemDto>>> GetCartItems(int userId)
        {
            var cartItems = await _carts.GetCartItemsForUserAsync(userId);

            return Ok(cartItems);
        }
    }
}
