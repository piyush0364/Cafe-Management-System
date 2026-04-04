using WebApICafe.Models;
using WebApICafe.Repositories.Interfaces;
using WebApICafe.Services.Interfaces;

namespace WebApICafe.Services;

public class OrderItemService : IOrderItemService
{
    private readonly IGenericRepository<OrderItem> _repository;

    public OrderItemService(IGenericRepository<OrderItem> repository)
    {
        _repository = repository;
    }

    public Task<List<OrderItem>> GetAllAsync(CancellationToken cancellationToken = default)
        => _repository.GetAllAsync(cancellationToken);

    public Task<List<OrderItem>> GetByOrderIdAsync(int orderId, CancellationToken cancellationToken = default)
        => _repository.FindAsync(o => o.OrderId == orderId, cancellationToken);

    public async Task<OrderItem?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        => await _repository.GetByIdAsync(id, cancellationToken);

    public async Task<OrderItem> CreateAsync(OrderItem orderItem, CancellationToken cancellationToken = default)
    {
        await _repository.AddAsync(orderItem, cancellationToken);
        await _repository.SaveChangesAsync(cancellationToken);
        return orderItem;
    }

    public async Task<bool> UpdateAsync(int id, OrderItem orderItem, CancellationToken cancellationToken = default)
    {
        if (id != orderItem.OrderItemId)
        {
            return false;
        }

        _repository.Update(orderItem);
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
