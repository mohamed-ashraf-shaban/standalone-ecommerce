import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormControlOptions, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from 'src/app/core/services/auth.service';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {
  errorMsg:string ='';
  isLoading:boolean = false
constructor(private _AuthService:AuthService,private _Router:Router){

}

loginForm:FormGroup = new FormGroup({
 
  email:new FormControl('' , [Validators.required, Validators.email]),
  password:new FormControl('' , [Validators.required, Validators.pattern(/^[a-zA-Z0-9_@]{6,}$/)]),
 
})





onSubmit(){
 const userData = this.loginForm.value;
 this.isLoading = true;
this._AuthService.login(userData).subscribe({
  next:(res)=>{
    if(res.message == 'success'){
      this.isLoading= false;
      localStorage.setItem('userToken',res.token);
      this._AuthService.userToken();
      this._Router.navigate(['/home'])
    }
  },
  error:(err)=>{
    this.errorMsg = err.error.message
    this.isLoading= false
  }
})
}
}
