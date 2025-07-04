import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule} from '@angular/forms';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
})
export class LoginComponent {
  username: string = '';
  password: String = '';
  formSubmitted = false;

  validUser =
  {
    username : 'user123',
    password : '123456'
  };

  constructor(private router: Router) {}

onSubmit(form:any) {
  this.formSubmitted = true;
  if(form.invalid){
    return;
  }
  
  if (this.username && this.password) {

    if(this.username === this.validUser.username&&this.password === this.validUser.password)
    {
      alert(`Login successful!\nUsername: ${this.username}`);
      this.router.navigate(['/dashboard']); 
    }
    else {
    alert('Invalid username or password.');
  }
} else{
  alert('Please enter valid username and password.')
}
}
}

