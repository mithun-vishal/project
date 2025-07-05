using Dapper;
using Microsoft.Extensions.Configuration;
using Npgsql;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;
using WebApplication2.DbContext;
using WebApplication2.Models;

namespace WebApplication2.Service;

public interface IUserService
{
    Task<IEnumerable<User>> GetAllUsersAsync();
    Task<User> GetUserByIdAsync(int id);
    Task<int> CreateUserAsync(User user);
    Task<int> UpdateUserAsync(User user);
    Task<int> DeleteUserAsync(int id);
}

public class UserService(IDbConnectionFactory DbConnectionFactory) : IUserService
{
    

    private readonly IDbConnectionFactory _DbConnectionFactory = DbConnectionFactory;

    
     
    public async Task<IEnumerable<User>> GetAllUsersAsync()
    {
        using var conn = _DbConnectionFactory.CreateConnection();

        string sql = "SELECT * FROM Users";
        return await conn.QueryAsync<User>(sql);
    }

    public async Task<User> GetUserByIdAsync(int id)
    {
        using var conn = _DbConnectionFactory.CreateConnection();
        string sql = "SELECT * FROM Users WHERE Id = @Id";
        return await conn.QueryFirstOrDefaultAsync<User>(sql, new { Id = id });
    }

    public async Task<int> CreateUserAsync(User user)
    {
        using var conn = _DbConnectionFactory.CreateConnection();
        string sql = @"
            INSERT INTO Users 
            (FirstName, LastName, Address, City, State, CountryCode, DOB, Age, Gender, PhoneNumber, Email, Password)
            VALUES 
            (@FirstName, @LastName, @Address, @City, @State, @CountryCode, @DOB, @Age, @Gender, @PhoneNumber, @Email, @Password)";
        return await conn.ExecuteAsync(sql, user);
    }

    public async Task<int> UpdateUserAsync(User user)
    {
        using var conn = _DbConnectionFactory.CreateConnection();
        string sql = @"
            UPDATE Users SET 
                FirstName = @FirstName,
                LastName = @LastName,
                Address = @Address,
                City = @City,
                State = @State,
                CountryCode = @CountryCode,
                DOB = @DOB,
                Age = @Age,
                Gender = @Gender,
                PhoneNumber = @PhoneNumber,
                Email = @Email,
                Password = @Password
            WHERE Id = @Id";
        return await conn.ExecuteAsync(sql, user);
    }

    public async Task<int> DeleteUserAsync(int id)
    {
        using var conn = _DbConnectionFactory.CreateConnection();
        string sql = "DELETE FROM Users WHERE Id = @Id";
        return await conn.ExecuteAsync(sql, new { Id = id });
    }
}