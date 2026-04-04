using WebApICafe.Models;
using WebApICafe.Repositories.Interfaces;
using WebApICafe.Services.Interfaces;

namespace WebApICafe.Services;

public class ContactService : IContactService
{
    private readonly IGenericRepository<Contact> _repository;

    public ContactService(IGenericRepository<Contact> repository)
    {
        _repository = repository;
    }

    public Task<List<Contact>> GetAllAsync(CancellationToken cancellationToken = default)
        => _repository.GetAllAsync(cancellationToken);

    public async Task<Contact?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        => await _repository.GetByIdAsync(id, cancellationToken);

    public async Task<Contact> CreateAsync(Contact contact, CancellationToken cancellationToken = default)
    {
        await _repository.AddAsync(contact, cancellationToken);
        await _repository.SaveChangesAsync(cancellationToken);
        return contact;
    }

    public async Task<bool> UpdateAsync(int id, Contact contact, CancellationToken cancellationToken = default)
    {
        if (id != contact.ContactId)
        {
            return false;
        }

        _repository.Update(contact);
        await _repository.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var entity = await _repository.GetByIdAsync(id, cancellationToken);
        if (entity is null)
        {
            return false;
        }

        _repository.Remove(entity);
        await _repository.SaveChangesAsync(cancellationToken);
        return true;
    }
}
