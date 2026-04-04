using WebApICafe.Models;

namespace WebApICafe.Services.Interfaces;

public interface IOrderItemService
{
    Task<List<OrderItem>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<List<OrderItem>> GetByOrderIdAsync(int orderId, CancellationToken cancellationToken = default);
    Task<OrderItem?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<OrderItem> CreateAsync(OrderItem orderItem, CancellationToken cancellationToken = default);
    Task<bool> UpdateAsync(int id, OrderItem orderItem, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}
