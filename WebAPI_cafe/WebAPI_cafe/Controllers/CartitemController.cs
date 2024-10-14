using Microsoft.AspNetCore.Http;
using Microsoft.EntityFrameworkCore; // For ToListAsync()
using Microsoft.AspNetCore.Mvc;
using WebAPI_cafe.Dto;
using WebAPI_cafe.Models;
using System.Linq; // For LINQ methods
using System.Collections.Generic; 

namespace WebAPI_cafe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CartitemController : ControllerBase
    {
        private readonly CafeMgmContext _context;

        public CartitemController(CafeMgmContext context)
        {
            _context = context;
        }

        [HttpGet("{userId}")]
        public async Task<ActionResult<IEnumerable<CartItemDto>>> GetCartItems(int userId)
        {
            var cartItems = await (from cart in _context.Carts
                                   join product in _context.Products
                                   on cart.ProductId equals product.ProductId
                                   where cart.UserId == userId
                                   select new CartItemDto
                                   {   ProductId = product.ProductId,
                                       CartId = cart.CartId,
                                       ProductName = product.Name,
                                       Price = (decimal)product.Price,
                                       ImageUrl = product.ImageUrl,
                                       Quantity = (int)cart.Quantity
                                   }).ToListAsync();

            return Ok(cartItems);
        }
    }
}
