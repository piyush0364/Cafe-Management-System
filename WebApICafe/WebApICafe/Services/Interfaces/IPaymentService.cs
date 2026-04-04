using WebApICafe.Models;

namespace WebApICafe.Services.Interfaces;

public interface IPaymentService
{
    Task<List<Payment>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Payment?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<Payment> CreateAsync(Payment payment, CancellationToken cancellationToken = default);
    Task<bool> UpdateAsync(int id, Payment payment, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}
