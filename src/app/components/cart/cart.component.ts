import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AddtocartService } from 'src/app/core/services/addtocart.service';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartData:any = null;
constructor(private AddtocartService:AddtocartService,private _Renderer2:Renderer2){

}
ngOnInit(): void {
  this.AddtocartService.getUserCart().subscribe({
    next:(res)=>{
      this.cartData = res.data
    }
  })
}


removeItem(item:any){
  this.AddtocartService.removeCartItem(item).subscribe({
    next:(res)=>{
      this.cartData = res.data
      this.AddtocartService.cartNum.next(res.numOfCartItems)
    }
  })
}

changeCount(count:number,id:string,btn1:HTMLButtonElement,btn2:HTMLButtonElement){

  if(count >= 0){
    this._Renderer2.setAttribute(btn1 , 'disabled' , 'true');
    this._Renderer2.setAttribute(btn2 , 'disabled' , 'true');
    this.AddtocartService. updateCartCount(id,count).subscribe({
      next:(res)=>{
        this.cartData = res.data
        this._Renderer2.removeAttribute(btn1 , 'disabled');
        this._Renderer2.removeAttribute(btn2 , 'disabled');
      },
      error:(error)=>{
        this._Renderer2.removeAttribute(btn1 , 'disabled');
        this._Renderer2.removeAttribute(btn2 , 'disabled');
      }
    })
  }

}

deleteUserCart(){
  this.AddtocartService.clearUserCart().subscribe({
    next:(res)=>{
      if(res.message === "success")
      this.cartData = null;
      this.AddtocartService.cartNum.next(0)
    }
  })
}

}
