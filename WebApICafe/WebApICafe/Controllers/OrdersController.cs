using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApICafe.Models;
using WebApICafe.Services.Interfaces;

namespace WebApICafe.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrdersController : ControllerBase
    {
        private readonly IOrderService _orderService;

        public OrdersController(IOrderService orderService)
        {
            _orderService = orderService;
        }

        // GET: api/Orders
        [HttpGet]
        [Authorize(Roles = "Admin1256")]
        public async Task<ActionResult<IEnumerable<Order>>> GetOrders()
        {
            return await _orderService.GetAllAsync();
        }

        // GET: api/Orders/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Order>> GetOrder(int id)
        {
            var order = await _orderService.GetByIdAsync(id);

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
                var isUpdated = await _orderService.UpdateAsync(id, order);
                if (!isUpdated)
                {
                    return NotFound();
                }
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await OrderExists(id))
                {
                    return NotFound();
                }
                else
                {
                    throw;
                }
            }

            return NoContent();
        }

        // POST: api/Orders
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Order>> PostOrder(Order order)
        {
            await _orderService.CreateAsync(order);

            return CreatedAtAction("GetOrder", new { id = order.OrderId }, order);
        }

        // DELETE: api/Orders/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin1256")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var isDeleted = await _orderService.DeleteAsync(id);
            if (!isDeleted)
            {
                return NotFound();
            }

            return NoContent();
        }

        private async Task<bool> OrderExists(int id)
        {
            var order = await _orderService.GetByIdAsync(id);
            return order is not null;
        }

        [HttpGet("history/{userId}")]
        [Authorize]
        public async Task<IActionResult> GetOrderHistory(int userId)
        {
            var orderHistory = await _orderService.GetHistoryByUserIdAsync(userId);

            if (orderHistory == null || !orderHistory.Any())
            {
                return NotFound("No orders found for the specified user.");
            }

            return Ok(orderHistory);
        }
    }
}
