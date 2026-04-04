namespace WebApICafe.Configuration;

public class JwtOptions
{
    public const string SectionName = "Jwt";

    public string Key { get; set; } = string.Empty;

    public int ExpiryHours { get; set; } = 24;
}
