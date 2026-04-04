using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApICafe.Models;
using WebApICafe.Services.Interfaces;

namespace WebApICafe.Controllers;

[Route("api/[controller]")]
[ApiController]
public class OrderItemsController : ControllerBase
{
    private readonly IOrderItemService _orderItemService;

    public OrderItemsController(IOrderItemService orderItemService)
    {
        _orderItemService = orderItemService;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<OrderItem>>> GetOrderItems()
    {
        return await _orderItemService.GetAllAsync();
    }

    [HttpGet("{id}")]
    [Authorize(Roles = "Admin1256")]
    public async Task<ActionResult<OrderItem>> GetOrderItem(int id)
    {
        var orderItem = await _orderItemService.GetByIdAsync(id);
        if (orderItem == null)
        {
            return NotFound();
        }

        return orderItem;
    }

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
            var isUpdated = await _orderItemService.UpdateAsync(id, orderItem);
            if (!isUpdated)
            {
                return NotFound();
            }
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await OrderItemExists(id))
            {
                return NotFound();
            }

            throw;
        }

        return NoContent();
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<OrderItem>> PostOrderItem(OrderItem orderItem)
    {
        await _orderItemService.CreateAsync(orderItem);
        return CreatedAtAction(nameof(GetOrderItem), new { id = orderItem.OrderItemId }, orderItem);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin1256")]
    public async Task<IActionResult> DeleteOrderItem(int id)
    {
        var isDeleted = await _orderItemService.DeleteAsync(id);
        if (!isDeleted)
        {
            return NotFound();
        }

        return NoContent();
    }

    [HttpGet("orderdetail/{orderId}")]
    [Authorize]
    public async Task<IActionResult> GetOrderHistory(int orderId)
    {
        var orderDetails = await _orderItemService.GetByOrderIdAsync(orderId);
        if (orderDetails.Count == 0)
        {
            return NotFound("No order Items found for the specified Order No..");
        }

        return Ok(orderDetails);
    }

    private async Task<bool> OrderItemExists(int id)
    {
        var orderItem = await _orderItemService.GetByIdAsync(id);
        return orderItem is not null;
    }
}
