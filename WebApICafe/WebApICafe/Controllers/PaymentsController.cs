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
    public class PaymentsController : ControllerBase
    {
        private readonly IRepository<Payment> _payments;

        public PaymentsController(IRepository<Payment> payments)
        {
            _payments = payments;
        }

        // GET: api/Payments
        [HttpGet]
        [Authorize]
        public async Task<ActionResult<IEnumerable<Payment>>> GetPayments()
        {
            return Ok(await _payments.GetAllAsync());
        }

        // GET: api/Payments/5
        [HttpGet("{id}")]
        [Authorize]
        public async Task<ActionResult<Payment>> GetPayment(int id)
        {
            var payment = await _payments.GetByIdAsync(id);

            if (payment == null)
            {
                return NotFound();
            }

            return payment;
        }

        // PUT: api/Payments/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
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
                await _payments.UpdateAsync(payment);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _payments.ExistsAsync(e => e.PaymentId == id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        // POST: api/Payments
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Payment>> PostPayment(Payment payment)
        {
            await _payments.AddAsync(payment);

            return CreatedAtAction("GetPayment", new { id = payment.PaymentId }, payment);
        }

        // DELETE: api/Payments/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin1256")]
        public async Task<IActionResult> DeletePayment(int id)
        {
            var payment = await _payments.GetByIdAsync(id);
            if (payment == null)
            {
                return NotFound();
            }

            await _payments.DeleteAsync(payment);

            return NoContent();
        }
    }
}
