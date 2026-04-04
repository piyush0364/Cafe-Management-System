using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApICafe.Models;
using WebApICafe.Services.Interfaces;

namespace WebApICafe.Controllers;

[Route("api/[controller]")]
[ApiController]
public class PaymentsController : ControllerBase
{
    private readonly IPaymentService _paymentService;

    public PaymentsController(IPaymentService paymentService)
    {
        _paymentService = paymentService;
    }

    [HttpGet]
    [Authorize]
    public async Task<ActionResult<IEnumerable<Payment>>> GetPayments()
    {
        return await _paymentService.GetAllAsync();
    }

    [HttpGet("{id}")]
    [Authorize]
    public async Task<ActionResult<Payment>> GetPayment(int id)
    {
        var payment = await _paymentService.GetByIdAsync(id);
        if (payment == null)
        {
            return NotFound();
        }

        return payment;
    }

    [HttpPut("{id}")]
    [Authorize]
    public async Task<IActionResult> PutPayment(int id, Payment payment)
    {
        if (id != payment.PaymentId)
        {
            return BadRequest();
        }

        try
        {
            var isUpdated = await _paymentService.UpdateAsync(id, payment);
            if (!isUpdated)
            {
                return NotFound();
            }
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await PaymentExists(id))
            {
                return NotFound();
            }

            throw;
        }

        return NoContent();
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Payment>> PostPayment(Payment payment)
    {
        await _paymentService.CreateAsync(payment);
        return CreatedAtAction(nameof(GetPayment), new { id = payment.PaymentId }, payment);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin1256")]
    public async Task<IActionResult> DeletePayment(int id)
    {
        var isDeleted = await _paymentService.DeleteAsync(id);
        if (!isDeleted)
        {
            return NotFound();
        }

        return NoContent();
    }

    private async Task<bool> PaymentExists(int id)
    {
        var payment = await _paymentService.GetByIdAsync(id);
        return payment is not null;
    }
}
