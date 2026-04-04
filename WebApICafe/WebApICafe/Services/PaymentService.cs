using WebApICafe.Models;
using WebApICafe.Repositories.Interfaces;
using WebApICafe.Services.Interfaces;

namespace WebApICafe.Services;

public class PaymentService : IPaymentService
{
    private readonly IGenericRepository<Payment> _repository;

    public PaymentService(IGenericRepository<Payment> repository)
    {
        _repository = repository;
    }

    public Task<List<Payment>> GetAllAsync(CancellationToken cancellationToken = default)
        => _repository.GetAllAsync(cancellationToken);

    public async Task<Payment?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        => await _repository.GetByIdAsync(id, cancellationToken);

    public async Task<Payment> CreateAsync(Payment payment, CancellationToken cancellationToken = default)
    {
        await _repository.AddAsync(payment, cancellationToken);
        await _repository.SaveChangesAsync(cancellationToken);
        return payment;
    }

    public async Task<bool> UpdateAsync(int id, Payment payment, CancellationToken cancellationToken = default)
    {
        if (id != payment.PaymentId)
        {
            return false;
        }

        _repository.Update(payment);
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
