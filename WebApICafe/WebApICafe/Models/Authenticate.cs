using System.Text.Json.Serialization;

namespace WebApICafe.Models;

public class Authenticate
{
    [JsonPropertyName("username")]
    public string Username { get; set; } = null!;

    [JsonPropertyName("password")]
    public string Password { get; set; } = null!;
}
