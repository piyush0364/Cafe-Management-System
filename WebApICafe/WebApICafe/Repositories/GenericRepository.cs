using Microsoft.EntityFrameworkCore;
using System.Linq.Expressions;
using WebApICafe.Models;
using WebApICafe.Repositories.Interfaces;

namespace WebApICafe.Repositories;

public class GenericRepository<TEntity> : IGenericRepository<TEntity> where TEntity : class
{
    private readonly CafeMgm2Context _dbContext;
    private readonly DbSet<TEntity> _dbSet;

    public GenericRepository(CafeMgm2Context dbContext)
    {
        _dbContext = dbContext;
        _dbSet = dbContext.Set<TEntity>();
    }

    public Task<List<TEntity>> GetAllAsync(CancellationToken cancellationToken = default)
        => _dbSet.ToListAsync(cancellationToken);

    public Task<List<TEntity>> FindAsync(
        Expression<Func<TEntity, bool>> predicate,
        CancellationToken cancellationToken = default)
        => _dbSet.Where(predicate).ToListAsync(cancellationToken);

    public ValueTask<TEntity?> GetByIdAsync(object id, CancellationToken cancellationToken = default)
        => _dbSet.FindAsync(new[] { id }, cancellationToken);

    public Task AddAsync(TEntity entity, CancellationToken cancellationToken = default)
        => _dbSet.AddAsync(entity, cancellationToken).AsTask();

    public void Update(TEntity entity) => _dbSet.Update(entity);

    public void Remove(TEntity entity) => _dbSet.Remove(entity);

    public Task<bool> AnyAsync(
        Expression<Func<TEntity, bool>> predicate,
        CancellationToken cancellationToken = default)
        => _dbSet.AnyAsync(predicate, cancellationToken);

    public Task<int> SaveChangesAsync(CancellationToken cancellationToken = default)
        => _dbContext.SaveChangesAsync(cancellationToken);
}
