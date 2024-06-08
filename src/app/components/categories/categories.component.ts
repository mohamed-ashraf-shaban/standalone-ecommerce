import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductService } from 'src/app/core/services/product.service';
import { Categories } from 'src/app/core/interfaces/categories';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule,RouterLink],
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent  implements OnInit{
  categoryData:Categories[]=[]
constructor(private _ProductService:ProductService){

}
ngOnInit(): void {
  this._ProductService.getCategories().subscribe({
    next:(res)=>{
      this.categoryData = res.data
    }
  })
}

}
