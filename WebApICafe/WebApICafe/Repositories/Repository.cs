using System.Linq.Expressions;
using Microsoft.EntityFrameworkCore;
using WebApICafe.Models;

namespace WebApICafe.Repositories;

public class Repository<T> : IRepository<T> where T : class
{
    protected CafeMgm2Context Context { get; }

    public Repository(CafeMgm2Context context)
    {
        Context = context;
    }

    public virtual async Task<T?> GetByIdAsync(params object[] keyValues)
        => await Context.Set<T>().FindAsync(keyValues);

    public virtual async Task<IReadOnlyList<T>> GetAllAsync(CancellationToken cancellationToken = default)
        => await Context.Set<T>().ToListAsync(cancellationToken);

    public virtual async Task<IReadOnlyList<T>> GetWhereAsync(Expression<Func<T, bool>> predicate, CancellationToken cancellationToken = default)
        => await Context.Set<T>().Where(predicate).ToListAsync(cancellationToken);

    public virtual async Task AddAsync(T entity, CancellationToken cancellationToken = default)
    {
        await Context.Set<T>().AddAsync(entity, cancellationToken);
        await Context.SaveChangesAsync(cancellationToken);
    }

    public virtual async Task UpdateAsync(T entity, CancellationToken cancellationToken = default)
    {
        Context.Entry(entity).State = EntityState.Modified;
        await Context.SaveChangesAsync(cancellationToken);
    }

    public virtual async Task DeleteAsync(T entity, CancellationToken cancellationToken = default)
    {
        Context.Set<T>().Remove(entity);
        await Context.SaveChangesAsync(cancellationToken);
    }

    public virtual async Task<bool> ExistsAsync(Expression<Func<T, bool>> predicate, CancellationToken cancellationToken = default)
        => await Context.Set<T>().AnyAsync(predicate, cancellationToken);
}
