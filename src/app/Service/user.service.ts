import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http:HttpClient) { }

  public login(url:string,data:any){
    return this.http.post(environment.baseUrl+url,data);
  }

  public register(url:string,data:any){
    return this.http.post(environment.baseUrl+url,data);
  }

  isLoggedIn(){
    return localStorage.getItem('token')
  }
}
