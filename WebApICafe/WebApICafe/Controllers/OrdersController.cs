using System.Collections.Generic;
using System.Linq;
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
    public class OrdersController : ControllerBase
    {
        private readonly IRepository<Order> _orders;

        public OrdersController(IRepository<Order> orders)
        {
            _orders = orders;
        }

        // GET: api/Orders
        [HttpGet]
        [Authorize(Roles = "Admin1256")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return Ok(await _orders.GetAllAsync());
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _orders.GetByIdAsync(id);

            if (order == null)
            {
                return NotFound();
            }

            return order;
        }

        // PUT: api/Orders/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin1256")]
        public async Task<IActionResult> PutOrder(int id, Order order)
        {
            if (id != order.OrderId)
            {
                return BadRequest();
            }

            try
            {
                await _orders.UpdateAsync(order);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _orders.ExistsAsync(e => e.OrderId == id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            await _orders.AddAsync(order);

            return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin1256")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var order = await _orders.GetByIdAsync(id);
            if (order == null)
            {
                return NotFound();
            }

            await _orders.DeleteAsync(order);

            return NoContent();
        }

        [HttpGet("history/{userId}")]
        [Authorize]
        public async Task<IActionResult> GetOrderHistory(int userId)
        {
            var orderHistory = await _orders.GetWhereAsync(o => o.UserId == userId);

            if (!orderHistory.Any())
            {
                return NotFound("No orders found for the specified user.");
            }

            return Ok(orderHistory);
        }
    }
}
