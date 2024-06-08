import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WishlistService } from 'src/app/core/services/wishlist.service';
import { Products } from 'src/app/core/interfaces/products';
import { ToastrService } from 'ngx-toastr';
import { RouterLink } from '@angular/router';
import { CutTextPipe } from 'src/app/core/pips/cut-text.pipe';
import { AddtocartService } from 'src/app/core/services/addtocart.service';

@Component({
  selector: 'app-wishlist',
  standalone: true,
  imports: [CommonModule,RouterLink,CutTextPipe],
  templateUrl: './wishlist.component.html',
  styleUrls: ['./wishlist.component.scss']
})
export class WishlistComponent implements OnInit {

constructor(private _WishlistService:WishlistService,private _toastr:ToastrService,private _Renderer2:Renderer2, private _AddtocartService:AddtocartService){}
products:Products[] = [];
wishlistData:string[] = [];
ngOnInit(): void {
  this._WishlistService.getWishlist().subscribe({
    next:(res)=>{
      this.products = res.data
      const newData = res.data.map((item:any)=>item._id)
      
      this.wishlistData = newData
    }
  })
}


addProduct(id:any, element:HTMLButtonElement){
  this._Renderer2.setAttribute(element , 'disabled' , 'true')
  this._AddtocartService.addToCart(id).subscribe({
    next:(res)=>{
      this._toastr.success(res.message, 'Successfully !');
      this._Renderer2.removeAttribute(element , 'disabled');
      this._AddtocartService.cartNum.next(res.numOfCartItems)
    },
    error:(error)=>{
      this._Renderer2.removeAttribute(element , 'disabled')
    }
  })
}

addFav(prodId:string|null){
  this._WishlistService.addToWishlist(prodId).subscribe({
    next:(res)=>{
      console.log(res)
      this._toastr.success(res.message)
      this.wishlistData = res.data
    }
  })
}

removeFav(prodId:string|null){
  this._WishlistService.removeItemWishlist(prodId).subscribe({
    next:(res)=>{
      console.log(res)
      this._toastr.success(res.message)
      this.wishlistData = res.data

      const newProductsData = this.products.filter((item:any) => this.wishlistData.includes(item._id))
    
      this.products  = newProductsData
    }
  })
}
}
