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
    public class ContactsController : ControllerBase
    {
        private readonly IRepository<Contact> _contacts;

        public ContactsController(IRepository<Contact> contacts)
        {
            _contacts = contacts;
        }

        // GET: api/Contacts
        [HttpGet]
        [Authorize(Roles = "Admin1256")]

        public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
        {
            return Ok(await _contacts.GetAllAsync());
        }

        // GET: api/Contacts/5
        [HttpGet("{id}")]
        [Authorize(Roles = "Admin1256")]
        public async Task<ActionResult<Contact>> GetContact(int id)
        {
            var contact = await _contacts.GetByIdAsync(id);

            if (contact == null)
            {
                return NotFound();
            }

            return contact;
        }

        // PUT: api/Contacts/5
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPut("{id}")]
        [Authorize(Roles = "Admin1256")]

        public async Task<IActionResult> PutContact(int id, Contact contact)
        {
            if (id != contact.ContactId)
            {
                return BadRequest();
            }

            try
            {
                await _contacts.UpdateAsync(contact);
            }
            catch (DbUpdateConcurrencyException)
            {
                if (!await _contacts.ExistsAsync(e => e.ContactId == id))
                {
                    return NotFound();
                }

                throw;
            }

            return NoContent();
        }

        // POST: api/Contacts
        // To protect from overposting attacks, see https://go.microsoft.com/fwlink/?linkid=2123754
        [HttpPost]
        [Authorize]
        public async Task<ActionResult<Contact>> PostContact(Contact contact)
        {
            await _contacts.AddAsync(contact);

            return CreatedAtAction("GetContact", new { id = contact.ContactId }, contact);
        }

        // DELETE: api/Contacts/5
        [HttpDelete("{id}")]
        [Authorize(Roles = "Admin1256")]
        public async Task<IActionResult> DeleteContact(int id)
        {
            var contact = await _contacts.GetByIdAsync(id);
            if (contact == null)
            {
                return NotFound();
            }

            await _contacts.DeleteAsync(contact);

            return NoContent();
        }
    }
}
