import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/core/services/product.service';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { ProductDetails } from 'src/app/core/interfaces/product-details';
import { AddtocartService } from 'src/app/core/services/addtocart.service';
import { ToastrService } from 'ngx-toastr';
@Component({
  selector: 'app-product-details',
  standalone: true,
  imports: [CommonModule,CarouselModule],
  templateUrl: './product-details.component.html',
  styleUrls: ['./product-details.component.scss']
})
export class ProductDetailsComponent implements OnInit{
productId!:string |null;
productDetails:any = {}

  constructor(private _ActivatedRoute:ActivatedRoute, private _ProductService:ProductService,private _Renderer2:Renderer2,private _AddtocartService:AddtocartService,private _toastr:ToastrService
  ){

  }
ngOnInit(): void {
  this._ActivatedRoute.paramMap.subscribe({
    next:(res:any)=>{
     this.productId = res.get('id')
    }
  })

  this._ProductService.getProductDetails(this.productId).subscribe({
    next:(res)=>{
     this. productDetails = res.data
    
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

productDetailsOptions: OwlOptions = {
  loop: true,
  mouseDrag: true,
  touchDrag: true,
  pullDrag: false,
  dots: true,
  navSpeed: 700,
  autoplay:true,
  autoplaySpeed:1000,
  autoplayTimeout:2000,
  navText: ['', ''],
  items:1,
  nav: false
}

}
