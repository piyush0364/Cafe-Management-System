using WebApICafe.Models;
using WebApICafe.Repositories.Interfaces;
using WebApICafe.Services.Interfaces;

namespace WebApICafe.Services;

public class CartService : ICartService
{
    private readonly IGenericRepository<Cart> _repository;

    public CartService(IGenericRepository<Cart> repository)
    {
        _repository = repository;
    }

    public Task<List<Cart>> GetAllAsync(CancellationToken cancellationToken = default)
        => _repository.GetAllAsync(cancellationToken);

    public async Task<Cart?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        => await _repository.GetByIdAsync(id, cancellationToken);

    public async Task<Cart> CreateAsync(Cart cart, CancellationToken cancellationToken = default)
    {
        await _repository.AddAsync(cart, cancellationToken);
        await _repository.SaveChangesAsync(cancellationToken);
        return cart;
    }

    public async Task<bool> UpdateAsync(int id, Cart cart, CancellationToken cancellationToken = default)
    {
        if (id != cart.CartId)
        {
            return false;
        }

        _repository.Update(cart);
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
