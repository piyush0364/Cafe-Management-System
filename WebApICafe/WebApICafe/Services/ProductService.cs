using WebApICafe.Models;
using WebApICafe.Repositories.Interfaces;
using WebApICafe.Services.Interfaces;

namespace WebApICafe.Services;

public class ProductService : IProductService
{
    private readonly IGenericRepository<Product> _productRepository;

    public ProductService(IGenericRepository<Product> productRepository)
    {
        _productRepository = productRepository;
    }

    public Task<List<Product>> GetAllAsync(CancellationToken cancellationToken = default)
        => _productRepository.GetAllAsync(cancellationToken);

    public async Task<Product?> GetByIdAsync(int id, CancellationToken cancellationToken = default)
        => await _productRepository.GetByIdAsync(id, cancellationToken);

    public async Task<Product> CreateAsync(Product product, CancellationToken cancellationToken = default)
    {
        await _productRepository.AddAsync(product, cancellationToken);
        await _productRepository.SaveChangesAsync(cancellationToken);
        return product;
    }

    public async Task<bool> UpdateAsync(int id, Product product, CancellationToken cancellationToken = default)
    {
        if (id != product.ProductId)
        {
            return false;
        }

        _productRepository.Update(product);
        await _productRepository.SaveChangesAsync(cancellationToken);
        return true;
    }

    public async Task<bool> DeleteAsync(int id, CancellationToken cancellationToken = default)
    {
        var product = await _productRepository.GetByIdAsync(id, cancellationToken);
        if (product is null)
        {
            return false;
        }

        _productRepository.Remove(product);
        await _productRepository.SaveChangesAsync(cancellationToken);
        return true;
    }
}
