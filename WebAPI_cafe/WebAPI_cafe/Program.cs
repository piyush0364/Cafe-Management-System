using Microsoft.EntityFrameworkCore;
using WebAPI_cafe.Models;

var builder = WebApplication.CreateBuilder(args);

builder.Services.AddCors();

// Add services to the container.
builder.Services.AddDbContext<CafeMgmContext>(options => options.UseSqlServer(builder.Configuration.GetConnectionString("CafeMgm")));

builder.Services.AddControllers().AddJsonOptions(
    options => {
        { options.JsonSerializerOptions.PropertyNamingPolicy = null; }
        { options.JsonSerializerOptions.DictionaryKeyPolicy = null; }
    }
   );

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}




app.UseHttpsRedirection();

app.UseAuthorization();

app.MapControllers();

app.Run();
