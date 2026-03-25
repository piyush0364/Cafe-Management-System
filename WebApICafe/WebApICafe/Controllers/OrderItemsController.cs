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
    public class OrderItemsController : ControllerBase
    {
        private readonly IRepository<OrderItem> _orderItems;

        public OrderItemsController(IRepository<OrderItem> orderItems)
        {
            _orderItems = orderItems;
        }

        // GET: api/OrderItems
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<OrderItem>>> GetOrderItems()
        {
            return Ok(await _orderItems.GetAllAsync());
        }

        // GET: api/OrderItems/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin1256")]
        public async Task<ActionResult<OrderItem>> GetOrderItem(int id)
        {
            var orderItem = await _orderItems.GetByIdAsync(id);

            if (orderItem == null)
            {
                return NotFound();
            }

            return orderItem;
        }

        // PUT: api/OrderItems/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin1256")]
        public async Task<IActionResult> PutOrderItem(int id, OrderItem orderItem)
        {
            if (id != orderItem.OrderItemId)
            {
                return BadRequest();
            }

            try
            {
                await _orderItems.UpdateAsync(orderItem);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _orderItems.ExistsAsync(e => e.OrderItemId == id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        // POST: api/OrderItems
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<OrderItem>> PostOrderItem(OrderItem orderItem)
        {
            await _orderItems.AddAsync(orderItem);

            return CreatedAtAction("GetOrderItem", new { id = orderItem.OrderItemId }, orderItem);
        }

        // DELETE: api/OrderItems/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin1256")]
        public async Task<IActionResult> DeleteOrderItem(int id)
        {
            var orderItem = await _orderItems.GetByIdAsync(id);
            if (orderItem == null)
            {
                return NotFound();
            }

            await _orderItems.DeleteAsync(orderItem);

            return NoContent();
        }

        [HttpGet("orderdetail/{orderId}")]
        [Authorize]
        public async Task<IActionResult> GetOrderHistory(int orderId)
        {
            var orderDetails = await _orderItems.GetWhereAsync(o => o.OrderId == orderId);

            if (!orderDetails.Any())
            {
                return NotFound("No order Items found for the specified Order No..");
            }

            return Ok(orderDetails);
        }
    }
}
