import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BrandsService } from 'src/app/core/services/brands.service';
import { Brands } from 'src/app/core/interfaces/brands';

@Component({
  selector: 'app-brands',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './brands.component.html',
  styleUrls: ['./brands.component.scss']
})
export class BrandsComponent implements OnInit {
brandsData:Brands[] = []
  constructor(private _BrandsService:BrandsService) {
    
  }

  ngOnInit(): void {
    this._BrandsService.getAllBrands().subscribe({
      next:(res)=>{
        console.log(res.data)
        this.brandsData = res.data
      }
    })
  }

}
