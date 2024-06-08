import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { AddtocartService } from 'src/app/core/services/addtocart.service';

@Component({
  selector: 'app-payment',
  standalone: true,
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './payment.component.html',
  styleUrls: ['./payment.component.scss']
})
export class PaymentComponent implements OnInit {

  constructor(private _ActivatedRoute:ActivatedRoute,private _AddtocartService:AddtocartService){

  }
  cartId:string|null = '';


paymentForm:FormGroup = new FormGroup({
  details: new FormControl(''),
        phone: new FormControl(''),
        city: new FormControl('')
})

handelForm(){

  this._AddtocartService.checkOut(this.cartId,this.paymentForm.value).subscribe({
    next:(res)=>{
      console.log(res)
      window.open(res.session.url,'_blank')
    }
  })
}
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(res)=>{
    this.cartId =   res.get('id')
    }
  })
}

}
