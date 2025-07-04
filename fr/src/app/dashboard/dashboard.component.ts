import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  imports: [FormsModule],
  standalone: true
})
export class DashboardComponent {
  constructor(private router: Router) {}

  logout() {
    
    this.router.navigate(['/']);
    alert('Log out succesfull...');
  }
}


  /*use
  pas
  username: string = 'mithun';
  condition(value:number){
    if(value:1)

  }*/


