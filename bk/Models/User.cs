using System.ComponentModel.DataAnnotations;
using System.ComponentModel.Design;
using System;
using System.ComponentModel.DataAnnotations.Schema;

namespace WebApplication2.Models
{
 
    public class User
    {
         
        public int Id { get; set; }

        
        public string FirstName { get; set; }

         
        public string LastName { get; set; }

        
        public string Address { get; set; }

        
        public string City { get; set; }

        
        public string State { get; set; }

        
        public string CountryCode { get; set; }

        
        public DateTime DOB { get; set; }

        
        public int Age { get; set; }

        
        public string Gender { get; set; }

        
        public int Phonenumber { get; set; }

         
        public string Email { get; set; }

         
        public string Password { get; set; }

    }
}
