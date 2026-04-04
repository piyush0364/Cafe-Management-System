using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApICafe.Models;
using WebApICafe.Services.Interfaces;

namespace WebApICafe.Controllers;

[Route("api/[controller]")]
[ApiController]
public class ContactsController : ControllerBase
{
    private readonly IContactService _contactService;

    public ContactsController(IContactService contactService)
    {
        _contactService = contactService;
    }

    [HttpGet]
    [Authorize(Roles = "Admin1256")]
    public async Task<ActionResult<IEnumerable<Contact>>> GetContacts()
    {
        return await _contactService.GetAllAsync();
    }

    [HttpGet("{id}")]
    [Authorize(Roles = "Admin1256")]
    public async Task<ActionResult<Contact>> GetContact(int id)
    {
        var contact = await _contactService.GetByIdAsync(id);
        if (contact == null)
        {
            return NotFound();
        }

        return contact;
    }

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
            var isUpdated = await _contactService.UpdateAsync(id, contact);
            if (!isUpdated)
            {
                return NotFound();
            }
        }
        catch (DbUpdateConcurrencyException)
        {
            if (!await ContactExists(id))
            {
                return NotFound();
            }

            throw;
        }

        return NoContent();
    }

    [HttpPost]
    [Authorize]
    public async Task<ActionResult<Contact>> PostContact(Contact contact)
    {
        await _contactService.CreateAsync(contact);
        return CreatedAtAction(nameof(GetContact), new { id = contact.ContactId }, contact);
    }

    [HttpDelete("{id}")]
    [Authorize(Roles = "Admin1256")]
    public async Task<IActionResult> DeleteContact(int id)
    {
        var isDeleted = await _contactService.DeleteAsync(id);
        if (!isDeleted)
        {
            return NotFound();
        }

        return NoContent();
    }

    private async Task<bool> ContactExists(int id)
    {
        var contact = await _contactService.GetByIdAsync(id);
        return contact is not null;
    }
}
