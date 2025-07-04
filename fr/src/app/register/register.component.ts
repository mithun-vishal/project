import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ReactiveFormsModule, ValidationErrors, Validators } from '@angular/forms';
import { RouterLink } from '@angular/router';
import { UserService, User } from '../services/user.service';


@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit {

  registrationForm!: FormGroup;
  formSubmitted = false;
  users:any[] = [];
  editMode = false;
  editIndex = -1;
  states = ['Tamil Nadu','Kerela','Karnataka','Andhra Pradesh'];
  today = new Date().toISOString().split('T')[0];


  constructor(private fb: FormBuilder, private userService: UserService){}

  ngOnInit(): void {
      this.registrationForm = this.fb.group({
        firstName:['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
        lastName:['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
        address:['', Validators.required],
        city:['', [Validators.required, Validators.pattern(/^[A-Za-z\s]+$/)]],
        state:['', Validators.required],
        countryCode:['IN', Validators.required],
        dob:['', [Validators.required, this.dobValidator]],
        age:['', [Validators.required, Validators.min(1), Validators.max(120)]],
        gender:['', Validators.required],
        phone:['', [Validators.required, Validators.pattern(/^[0-9]{10}$/)]],
        email:['', [Validators.required, Validators.email]],
        password:['', [Validators.required, Validators.minLength(6)]],
        confirmPassword:['', Validators.required],
      }, {validators: this.passwordsMatchValidator});
    
      this.registrationForm.get('dob')?.valueChanges.subscribe(dobValue =>{
        if(dobValue){
          const age = this.calculateAge(new Date(dobValue));
          this.registrationForm.get('age')?.setValue(age);
        }
      });

     this.loadUsers();
  }

      loadUsers(): void{
        this.userService.getUsers().subscribe({
          next: data => {
            this.users = data;
             
          },
          error: err =>{
             console.error('Failed to load users',err);
          }
        });
      }

   calculateAge(dob: Date): number{
        const today = new Date();
        let age = today.getFullYear() - dob.getFullYear();
        const m = today.getMonth() - dob.getMonth();
        if (m < 0 || (m === 0 && today.getDate() < dob.getDate())){
          age--;
        }
        return age;
      }

      dobValidator(control: AbstractControl): ValidationErrors | null{
        const dob = new Date(control.value);
        const today = new Date();
        const minDate = new Date(today.getFullYear() - 120,today.getMonth(), today.getDate());

        if(dob > today)
        {
          return { futureDate: true};
        }
        if(dob<minDate){
          return { tooOld: true};
        }
        return null;
      }

    passwordsMatchValidator(formGroup: AbstractControl): ValidationErrors | null {
       const password = formGroup.get('password')?.value;
       const confirmPassword = formGroup.get('confirmPassword')?.value;
        if (password !== confirmPassword) {
         return { passwordsMismatch: true };
        }
         return null;
    }
  

  onSubmit(): void{
    this.formSubmitted = true;
    
    if (this.registrationForm.invalid){
      this.registrationForm.markAllAsTouched();
      return;
    } 

    const fromValue = this.registrationForm.value;

    //http

    const userData: User = { ...fromValue };
    delete (userData as any).confirmPassword;

if (this.editMode) {
  const userId = this.users[this.editIndex].id;
  this.userService.updateUser(userId, userData).subscribe(() => {
    this.loadUsers();
    this.resetForm();
  });
} else {
  this.userService.addUser(userData).subscribe(() => {

    alert("Details Sumitted Successfully");

    this.loadUsers();
    this.resetForm();
  });
}
}

resetForm(): void {
  this.registrationForm.reset({ countryCode: 'IN' });
  this.editMode = false;
  this.editIndex = -1;
  this.formSubmitted = false;
}

  

  editUser(index:number): void{
    this.registrationForm.patchValue(this.users[index]);
    this.editMode = true;
    this.editIndex = index;
  }

deleteUser(index: number): void{
 const userId = this.users[index].id;
 this.userService.deleteUser(userId).subscribe(() => {
  this.loadUsers();
 });
}

  get f(){
    return this.registrationForm.controls;
  }
}
