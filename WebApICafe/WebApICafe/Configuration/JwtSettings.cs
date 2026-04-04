namespace WebApICafe.Configuration;

public sealed class JwtSettings
{
    public const string SectionName = "Jwt";

    public string SigningKey { get; set; } = string.Empty;

    public string? Issuer { get; set; }

    public string? Audience { get; set; }

    public int ExpirationDays { get; set; } = 1;
}
