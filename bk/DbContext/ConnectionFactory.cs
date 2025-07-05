 
using System.Data;
using Microsoft.Extensions.Configuration;
using Npgsql;

namespace WebApplication2.DbContext;
public interface IDbConnectionFactory
{
    IDbConnection CreateConnection();
}


public class DbConnectionFactory : IDbConnectionFactory
{
    private readonly IConfiguration _configuration;

    public DbConnectionFactory(IConfiguration configuration)
    {
        _configuration = configuration;
    }

    public IDbConnection CreateConnection()
    {
        var connectionString = _configuration.GetConnectionString("DefaultConnection");
        return new NpgsqlConnection(connectionString);
    }
}

