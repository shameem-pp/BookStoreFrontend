import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Books } from '../models/books';

@Injectable({
  providedIn: 'root'
})
export class GlobalDataService {
  private books=new BehaviorSubject<any>(null);
  public shareBook=this.books.asObservable();
  private cartData=new BehaviorSubject<any>(null); 
  public shareCartData=this.cartData.asObservable();
  private showCartPage=new BehaviorSubject<any>(false);
  public shareShowCartPage=this.showCartPage.asObservable();
  private cartCount=new BehaviorSubject<any>(0);
  public shareCartCount=this.cartCount.asObservable();
  private customerInfo=new BehaviorSubject<any>(null);
  public shareCustomerInfo=this.customerInfo.asObservable();
  private isCartEmpty=new BehaviorSubject<boolean>(false);
  public shareCartEmpty=this.isCartEmpty.asObservable();
  private showOrderDetail=new BehaviorSubject<boolean>(false);
  public shareShowOrderDetail=this.showOrderDetail.asObservable();
  private searchText=new BehaviorSubject<string>('');
  public shareSearchText=this.searchText.asObservable();

  constructor() { }

  updateBook(book){
    this.books.next(book);
  }

  updateCartData(book){
    this.cartData.next(book);
  }

  updateshowCartPage(value){
    this.showCartPage.next(value);
  }

  updateCartCount(value){
    this.cartCount.next(value);
  }

  updateCustomerInfo(value){
    this.customerInfo.next(value);
  }

  updateIsCartEmpty(value){
    this.isCartEmpty.next(value);
  }

  updateShowOrderDetail(value){
    this.showOrderDetail.next(value);
  }

  updateSearchText(value){
    this.searchText.next(value);
  }
}
