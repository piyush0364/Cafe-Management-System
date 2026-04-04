using WebApICafe.Models;

namespace WebApICafe.Services.Interfaces;

public interface ICategoryService
{
    Task<List<Category>> GetAllAsync(CancellationToken cancellationToken = default);
    Task<Category?> GetByIdAsync(int id, CancellationToken cancellationToken = default);
    Task<Category> CreateAsync(Category category, CancellationToken cancellationToken = default);
    Task<bool> UpdateAsync(int id, Category category, CancellationToken cancellationToken = default);
    Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default);
}
