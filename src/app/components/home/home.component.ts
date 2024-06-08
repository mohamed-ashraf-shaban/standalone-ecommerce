import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Products } from 'src/app/core/interfaces/products';
import { CutTextPipe } from 'src/app/core/pips/cut-text.pipe';
import { Categories } from 'src/app/core/interfaces/categories';
import { CarouselModule, OwlOptions } from 'ngx-owl-carousel-o';
import { RouterLink } from '@angular/router';
import { AddtocartService } from 'src/app/core/services/addtocart.service';
import { ToastrService } from 'ngx-toastr';
import { SearchPipe } from 'src/app/core/pips/search.pipe';
import { FormsModule } from '@angular/forms';
import { WishlistService } from 'src/app/core/services/wishlist.service';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule,CutTextPipe,CarouselModule,RouterLink,SearchPipe,FormsModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  products:Products[] = [];
  categories:Categories[] = [];
  term:string =''
  wishlistData:string[] = [];
  constructor(private _ProductService:ProductService , private _AddtocartService:AddtocartService,private _toastr:ToastrService,private _Renderer2:Renderer2,private _WishlistService:WishlistService){

  }
  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next:(res)=>{
        this.products = res.data
        
      }
    })

    this._ProductService.getCategories().subscribe({
      next:(res)=>{
       this.categories = res.data ;
 
      }
    })

    this._WishlistService.getWishlist().subscribe({
      next:(res)=>{
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
      }
    })
  }

  customOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
   autoplay:true,
   autoplayTimeout:2000,
   autoplaySpeed:1000,
    navText: ['prev', 'next'],
    responsive: {
      0: {
        items: 1
      },
      400: {
        items: 2
      },
      740: {
        items: 4
      },
      940: {
        items: 6
      }
    },
    nav: false
  }
  mainSliderOptions: OwlOptions = {
    loop: true,
    mouseDrag: true,
    touchDrag: true,
    pullDrag: false,
    dots: true,
    navSpeed: 700,
    autoplay:true,
   autoplayTimeout:2000,
   autoplaySpeed:1000,
    navText: ['prev', 'next'],
  items:1,
    nav: false
  }

  

}
