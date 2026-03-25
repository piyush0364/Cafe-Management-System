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
    public class CartsController : ControllerBase
    {
        private readonly ICartRepository _carts;

        public CartsController(ICartRepository carts)
        {
            _carts = carts;
        }

        // GET: api/Carts
        [HttpGet]
        [Authorize(Roles = "Admin1256")]
        public async Task<ActionResult<IEnumerable<Cart>>> GetCarts()
        {
            return Ok(await _carts.GetAllAsync());
        }

        // GET: api/Carts/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin1256")]
        public async Task<ActionResult<Cart>> GetCart(int id)
        {
            var cart = await _carts.GetByIdAsync(id);

            if (cart == null)
            {
                return NotFound();
            }

            return cart;
        }

        // PUT: api/Carts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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
                await _carts.UpdateAsync(cart);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _carts.ExistsAsync(e => e.CartId == id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        // POST: api/Carts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Cart>> PostCart(Cart cart)
        {
            await _carts.AddAsync(cart);

            return CreatedAtAction("GetCart", new { id = cart.CartId }, cart);
        }

        // DELETE: api/Carts/5
        [HttpDelete("{id}")]
        [Authorize]
        public async Task<IActionResult> DeleteCart(int id)
        {
            var cart = await _carts.GetByIdAsync(id);
            if (cart == null)
            {
                return NotFound();
            }

            await _carts.DeleteAsync(cart);

            return NoContent();
        }
    }
}
