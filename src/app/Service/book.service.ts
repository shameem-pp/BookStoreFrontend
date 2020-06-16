import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http:HttpClient) { }

  public getAllBook(url:string){
    return this.http.get(environment.baseUrl+url);
  }

  public addBookToCart(url:string,data){
    return this.http.post(environment.baseUrl+url,data);
  }

  public getAllCartBook(url:string){
    return this.http.get(environment.baseUrl+url);
  }

  public deleteCartBook(url:string){
    return this.http.delete(environment.baseUrl+url);
  }

  public updateCartBook(url:string,data){
    return this.http.put(environment.baseUrl+url,data);
  }

  public getCustomerInfo(url:string){
    return this.http.get(environment.baseUrl+url);
  }

  public addCustomerInfo(url:string,data){
    return this.http.post(environment.baseUrl+url,data)
  }

  public addOrderInfo(url:string,data){
    return this.http.post(environment.baseUrl+url,data)
  }

  public getOrderInfo(url:string){
    return this.http.get(environment.baseUrl+url)
  }
}
