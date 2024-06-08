import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { AddtocartService } from 'src/app/core/services/addtocart.service';

@Component({
  selector: 'app-nav-blank',
  standalone: true,
  imports: [CommonModule,RouterLink,RouterLinkActive],
  templateUrl: './nav-blank.component.html',
  styleUrls: ['./nav-blank.component.scss']
})
export class NavBlankComponent implements OnInit {

  @ViewChild('navbar') navElement!:ElementRef // element
  
  @HostListener('window:scroll')
  onScroll():void{
    if(scrollY > 400){
      this._Renderer2.addClass(this.navElement.nativeElement , 'px-4');
      this._Renderer2.addClass(this.navElement.nativeElement , 'shadow');
    }else{
      this._Renderer2.removeClass(this.navElement.nativeElement , 'px-4');
      this._Renderer2.removeClass(this.navElement.nativeElement , 'shadow');
    }
  }

  cartNumber:number = 0;
constructor(private _Router:Router,private _AddtocartService:AddtocartService,private _Renderer2:Renderer2){

}
ngOnInit(): void {
  this._AddtocartService.cartNum.subscribe({
    next:(res)=>{
      this.cartNumber = res
    }
  })

  this._AddtocartService.getUserCart().subscribe({
    next:(res)=>{
      this.cartNumber = res.numOfCartItems;
    }
  })
}
  signOut(){
    localStorage.removeItem('userToken');
    this._Router.navigate(['/login'])
  }

}
