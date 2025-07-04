import { CommonModule, NgIf } from '@angular/common';
import { Component, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ChildComponent } from '../child/child.component';


@Component({
  selector: 'app-study',
  standalone: true,
  imports: [FormsModule,ReactiveFormsModule,CommonModule,ChildComponent],
  templateUrl: './study.component.html',
  styleUrl: './study.component.css',
})
export class StudyComponent {

  form = new FormGroup({
    username : new FormControl('',Validators.required),
    password : new FormControl('',[Validators.required,Validators.minLength(6)]),
  });

  onSubmit()
{
  if(this.form.valid)
  {
  alert('Login successful');
  }else{
   alert('Enter valid usrname and password');
  }
}

user : string ='';//two way binding

receiveData(data:any)

{
  alert("Data reived from child:($event)");
}

}

