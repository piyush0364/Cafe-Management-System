using WebApICafe.Models;
using WebApICafe.Repositories.Interfaces;
using WebApICafe.Services.Interfaces;

namespace WebApICafe.Services;

public class CategoryService : ICategoryService
{
    private readonly IGenericRepository<Category> _repository;

    public CategoryService(IGenericRepository<Category> repository)
    {
        _repository = repository;
    }

    public Task<List<Category>> GetAllAsync(CancellationToken cancellationToken = default)
        => _repository.GetAllAsync(cancellationToken);

    public async Task<Category?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        => await _repository.GetByIdAsync(id, cancellationToken);

    public async Task<Category> CreateAsync(Category category, CancellationToken cancellationToken = default)
    {
        await _repository.AddAsync(category, cancellationToken);
        await _repository.SaveChangesAsync(cancellationToken);
        return category;
    }

    public async Task<bool> UpdateAsync(int id, Category category, CancellationToken cancellationToken = default)
    {
        if (id != category.CategoryId)
        {
            return false;
        }

        _repository.Update(category);
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
