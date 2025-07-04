import { CommonModule } from '@angular/common';
import { Component} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule,RouterModule,ReactiveFormsModule,CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend-login';
  
  sidebarOpen = true;

  toggleSidebar(){
    this.sidebarOpen = !this.sidebarOpen;
  }

}