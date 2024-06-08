import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ForgetpasswordService } from 'src/app/core/services/forgetpassword.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-forgetpassword',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent {
  constructor(private _ForgetpasswordService:ForgetpasswordService,private _Router:Router){

  }
  step1:boolean = true;
  step2:boolean = false;
  step3:boolean = false;
  email:string = '';
  message:string = '';
  forgetPasswordForm:FormGroup = new FormGroup({
    email:new FormControl('')
  })

  resetCodeForm:FormGroup = new FormGroup({
    resetCode:new FormControl('')
  })

  resetPasswordForm:FormGroup = new FormGroup({
    newPassword:new FormControl('')
  })



  forgetPassword(){
    let userEmail = this.forgetPasswordForm.value
    this.email = userEmail.email
 
    this._ForgetpasswordService.forgetPassword(userEmail).subscribe({
      next:(res)=>{
 
        this.message = res.message
        this.step1 = false;
        this.step2 = true;
      },error:(err)=>{
     
        this.message = err.error.message

      }
    })
  }

  resetCode(){
    let resetCode = this.resetCodeForm.value
  
    this._ForgetpasswordService.resetCode(resetCode).subscribe({
      next:(res)=>{
    
        this.message = res.status
        this.step2 = false;
        this.step3 = true;
      },error:(err)=>{
       
        this.message = err.error.message

      }
    })
  }

  newPassword(){
    let resetPassword = this.resetPasswordForm.value
    resetPassword.email = this.email
    this._ForgetpasswordService.resetpassword( resetPassword).subscribe({
      next:(res)=>{
        
        if(res.token){
          localStorage.setItem('userToken',res.token);
          this._Router.navigate(['/home'])
        }
        // this.message = res.status
        // this.step2 = false;
        // this.step3 = true;
      },error:(err)=>{
   
        this.message = err.error.message

      }
    })
  }
}
