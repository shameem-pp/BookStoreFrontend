import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from 'src/app/Service/global-data.service';
import { BookService } from 'src/app/Service/book.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-order-summary',
  templateUrl: './order-summary.component.html',
  styleUrls: ['./order-summary.component.scss']
})
export class OrderSummaryComponent implements OnInit {
  orderData:any[]=[];
  cartBooks: void;
  total: number=0;
  constructor(private dataService:GlobalDataService,private router:Router,private bookServce:BookService,) { }
  showOrderdetail:boolean;
  ngOnInit(): void {
    this.dataService.shareShowOrderDetail.subscribe(x=>this.showOrderdetail=x);
    this.dataService.shareCartData.subscribe(x=>{
      this.cartBooks=x;
      for (let index = 0; index < x['length']; index++) {
        this.total=this.total+(x[index].quantity*x[index].price)        
      }
    });
  }

  onCheckout(){
    
    this.dataService.shareCartData.subscribe(x=>{
      for (let index = 0; index < x['length']; index++) {
       let data={
          customerEmail:localStorage.getItem('email'),
          bookId:x[index]['bookId'],
          quantity:x[index]['quantity']
        } 
        this.orderData[index]=data;
      }
  })
  this.addOrderInfo();
}


  private addOrderInfo() {
    this.bookServce.addOrderInfo('api/OrderDetails', this.orderData).subscribe(res => {
      this.dataService.updateIsCartEmpty(true);
      this.bookServce.getAllCartBook('api/cart?email=' + localStorage.getItem('email')).subscribe(res => {
        this.dataService.updateCartData(res);
        this.dataService.updateCartCount(res['length']);
        this.router.navigate(['checkout']);
      });
    });
  }
}
