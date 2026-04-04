using System.Security.Cryptography;

namespace WebApICafe.Helpers;

public static class PasswordHasher
{
    private static readonly int SaltSize = 16;
    private static readonly int HashSize = 20;
    private static readonly int Iterations = 10000;

    public static string HashPassword(string password)
    {
        var salt = new byte[SaltSize];
        RandomNumberGenerator.Fill(salt);
        var key = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA256);
        var hash = key.GetBytes(HashSize);

        var hashByte = new byte[SaltSize + HashSize];
        Array.Copy(salt, 0, hashByte, 0, SaltSize);
        Array.Copy(hash, 0, hashByte, SaltSize, HashSize);

        return Convert.ToBase64String(hashByte);
    }

    public static bool VerifyPassword(string password, string base64Hash)
    {
        if (string.IsNullOrEmpty(base64Hash))
            return false;

        byte[] hashBytes;
        try
        {
            hashBytes = Convert.FromBase64String(base64Hash);
        }
        catch (FormatException)
        {
            return false;
        }

        if (hashBytes.Length != SaltSize + HashSize)
            return false;

        var salt = new byte[SaltSize];
        Array.Copy(hashBytes, 0, salt, 0, SaltSize);
        var stored = hashBytes.AsSpan(SaltSize, HashSize);

        var derived = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA256).GetBytes(HashSize);
        if (CryptographicOperations.FixedTimeEquals(stored, derived))
            return true;

        derived = new Rfc2898DeriveBytes(password, salt, Iterations, HashAlgorithmName.SHA1).GetBytes(HashSize);
        return CryptographicOperations.FixedTimeEquals(stored, derived);
    }
}
