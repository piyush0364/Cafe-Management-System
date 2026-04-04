using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;
using WebApICafe.Configuration;
using WebApICafe.Models;

namespace WebApICafe.Services;

public sealed class JwtTokenService : IJwtTokenService
{
    private readonly JwtSettings _settings;
    private readonly JwtSecurityTokenHandler _tokenHandler = new();

    public JwtTokenService(IOptions<JwtSettings> options)
    {
        _settings = options.Value;
    }

    public string CreateToken(User user)
    {
        var keyBytes = Encoding.UTF8.GetBytes(_settings.SigningKey);
        var credentials = new SigningCredentials(
            new SymmetricSecurityKey(keyBytes),
            SecurityAlgorithms.HmacSha256);

        var claims = new List<Claim>
        {
            new(ClaimTypes.NameIdentifier, user.UserId.ToString()),
            new(ClaimTypes.Name, user.Name),
            new(ClaimTypes.Role, user.Username)
        };

        var descriptor = new SecurityTokenDescriptor
        {
            Subject = new ClaimsIdentity(claims),
            Expires = DateTime.UtcNow.AddDays(_settings.ExpirationDays),
            SigningCredentials = credentials
        };

        if (!string.IsNullOrEmpty(_settings.Issuer))
            descriptor.Issuer = _settings.Issuer;
        if (!string.IsNullOrEmpty(_settings.Audience))
            descriptor.Audience = _settings.Audience;

        var token = _tokenHandler.CreateToken(descriptor);
        return _tokenHandler.WriteToken(token);
    }
}
