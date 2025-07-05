using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using WebApplication2.DbContext;
using WebApplication2.Models;
using WebApplication2.Service;

namespace WebApplication2.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UsersController(IUserService userService) : ControllerBase
    {

        private readonly IUserService _userService = userService;

        private static List<User> users = new List<User>();
        private static int nextId = 1;

        [HttpPost]
        public async Task<int> Register(User user)
        {
            return await  _userService.CreateUserAsync(user); 
             
        }

        [HttpPut]
        public async Task<int> Update(User user)
        {
            return await _userService.UpdateUserAsync(user);

        }

        [HttpDelete]
        public async Task<int> Delete(int  id)
        {
            return await _userService.DeleteUserAsync(id);

        }

        [HttpGet("[action]")]
        public async Task<User> GetById(int id)
        {
            return await _userService.GetUserByIdAsync(id);

        }

        [HttpGet("[action]")]
        public async Task<IEnumerable<User>> GetAll()
        {
            return await _userService.GetAllUsersAsync();

        }

    }
}
