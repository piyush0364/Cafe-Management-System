using WebApICafe.Models;

namespace WebApICafe.Services.Interfaces;

public interface ICartService
{
    Task<List<Cart>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Cart?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<Cart> CreateAsync(Cart cart, CancellationToken cancellationToken = default);
    Task<bool> UpdateAsync(int id, Cart cart, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}
