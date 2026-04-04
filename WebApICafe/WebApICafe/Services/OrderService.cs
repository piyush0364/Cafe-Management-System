using WebApICafe.Models;
using WebApICafe.Repositories.Interfaces;
using WebApICafe.Services.Interfaces;

namespace WebApICafe.Services;

public class OrderService : IOrderService
{
    private readonly IGenericRepository<Order> _orderRepository;

    public OrderService(IGenericRepository<Order> orderRepository)
    {
        _orderRepository = orderRepository;
    }

    public Task<List<Order>> GetAllAsync(CancellationToken cancellationToken = default)
        => _orderRepository.GetAllAsync(cancellationToken);

    public async Task<Order?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        => await _orderRepository.GetByIdAsync(id, cancellationToken);

    public Task<List<Order>> GetHistoryByUserIdAsync(int userId, CancellationToken cancellationToken = default)
        => _orderRepository.FindAsync(o => o.UserId == userId, cancellationToken);

    public async Task<Order> CreateAsync(Order order, CancellationToken cancellationToken = default)
    {
        await _orderRepository.AddAsync(order, cancellationToken);
        await _orderRepository.SaveChangesAsync(cancellationToken);
        return order;
    }

    public async Task<bool> UpdateAsync(int id, Order order, CancellationToken cancellationToken = default)
    {
        if (id != order.OrderId)
        {
            return false;
        }

        _orderRepository.Update(order);
        await _orderRepository.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var order = await _orderRepository.GetByIdAsync(id, cancellationToken);
        if (order is null)
        {
            return false;
        }

        _orderRepository.Remove(order);
        await _orderRepository.SaveChangesAsync(cancellationToken);
        return true;
    }
}
