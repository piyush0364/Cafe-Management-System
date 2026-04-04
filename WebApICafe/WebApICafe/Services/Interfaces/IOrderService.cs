using WebApICafe.Models;

namespace WebApICafe.Services.Interfaces;

public interface IOrderService
{
    Task<List<Order>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Order?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<List<Order>> GetHistoryByUserIdAsync(int userId, CancellationToken cancellationToken = default);
    Task<Order> CreateAsync(Order order, CancellationToken cancellationToken = default);
    Task<bool> UpdateAsync(int id, Order order, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}
