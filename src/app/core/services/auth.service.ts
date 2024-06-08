import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { jwtDecode } from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
userInfo:any;
  constructor(private _HttpClient:HttpClient) { }

baseUrl = `https://ecommerce.routemisr.com/api/v1/auth/`;

  register(userData:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl + 'signup',userData)
  }


 login(userData:object):Observable<any>{
    return this._HttpClient.post(this.baseUrl + 'signin',userData)
  }

  userToken(){
    const encoded = localStorage.getItem('userToken');
    if(encoded !== null){
      const decode = jwtDecode(encoded);
      this.userInfo = decode
      console.log(this.userInfo)
    }
    
  }

}
