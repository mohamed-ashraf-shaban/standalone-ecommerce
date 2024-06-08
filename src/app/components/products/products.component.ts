import { Component, OnInit, Renderer2 } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { CutTextPipe } from 'src/app/core/pips/cut-text.pipe';
import { Products } from 'src/app/core/interfaces/products';
import { ToastrService } from 'ngx-toastr';
import { AddtocartService } from 'src/app/core/services/addtocart.service';
import { ProductService } from 'src/app/core/services/product.service';
import { NgxPaginationModule } from 'ngx-pagination';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule,CutTextPipe,RouterLink,NgxPaginationModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent implements OnInit {
  constructor(private _ProductService:ProductService , private _AddtocartService:AddtocartService,private _toastr:ToastrService,private _Renderer2:Renderer2){

  }
  products:Products[] = [];
  pageSize:number = 0;
  currentPage:number = 1;
  total:number = 0;
  ngOnInit(): void {
    this._ProductService.getProducts().subscribe({
      next:(res)=>{
     
        this.products = res.data;
        this.pageSize = res.metadata.limit;
        this.currentPage = res.metadata.currentPage;
        this.total = res.results;
        
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

  pageChanged(event:any){
    this._ProductService.getProducts(event).subscribe({
      next:(res)=>{
     
        this.products = res.data;
        this.pageSize = res.metadata.limit;
        this.currentPage = res.metadata.currentPage;
        this.total = res.results;
        
      }
    })
  }

}
