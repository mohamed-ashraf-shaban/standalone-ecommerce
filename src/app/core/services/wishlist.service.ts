import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WishlistService {

  constructor(private _HttpClient:HttpClient) { }
basUrl:string = 'https://ecommerce.routemisr.com/api/v1/'
  addToWishlist(prodId:string|null):Observable<any>{
   return this._HttpClient.post(this.basUrl + 'wishlist',{
    "productId": prodId
   })
  }


  getWishlist():Observable<any>{
    return this._HttpClient.get(this.basUrl + 'wishlist')
   }

   removeItemWishlist(prodId:string|null):Observable<any>{
    return this._HttpClient.delete(this.basUrl + `wishlist/${prodId}`)
   }
}
