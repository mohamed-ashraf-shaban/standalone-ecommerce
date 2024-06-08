import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AddtocartService {
cartNum:BehaviorSubject<number> = new BehaviorSubject(0);
  constructor(private _HttpClient:HttpClient) { }

basUrl:string = 'https://ecommerce.routemisr.com/api/v1/';

  addToCart(id:any):Observable<any>{
    return this._HttpClient.post(this.basUrl + `cart` ,{
     
        "productId": id
},
   )
  }

  getUserCart():Observable<any>{
    return this._HttpClient.get(this.basUrl + 'cart')
  }


removeCartItem(id:any):Observable<any>{
    return this._HttpClient.delete(this.basUrl + `cart/${id}`)
  }

  updateCartCount(prodId:string,countNum:number):Observable<any>{
    return this._HttpClient.put(this.basUrl +  `cart/${prodId}`,{
      count:countNum
    })
  }

  clearUserCart():Observable<any>{
    return this._HttpClient.delete(this.basUrl + `cart`)
  }

  checkOut(cartId:string|null,cartInfo:object):Observable<any>{
  return  this._HttpClient.post(this.basUrl + `orders/checkout-session/${cartId}?url=http://localhost:4200`,
{
  shippingAddress:cartInfo
}
  )
  }



}
