using WebApICafe.Models;

namespace WebApICafe.Services.Interfaces;

public interface IContactService
{
    Task<List<Contact>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Contact?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<Contact> CreateAsync(Contact contact, CancellationToken cancellationToken = default);
    Task<bool> UpdateAsync(int id, Contact contact, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}
