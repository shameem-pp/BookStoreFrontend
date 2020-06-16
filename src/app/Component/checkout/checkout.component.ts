import { Component, OnInit } from '@angular/core';
import { GlobalDataService } from 'src/app/Service/global-data.service';
import { BookService } from 'src/app/Service/book.service';

@Component({
  selector: 'app-checkout',
  templateUrl: './checkout.component.html',
  styleUrls: ['./checkout.component.scss']
})
export class CheckoutComponent implements OnInit {
  cartCount: number;
  orderId: any;

  constructor(private dataService:GlobalDataService,private bookService:BookService) { }

  ngOnInit(): void {
    this.dataService.shareCartCount.subscribe(x=>this.cartCount=x);
    this.bookService.getOrderInfo('api/OrderDetails/?email='+localStorage.getItem('email')).subscribe(x=>{
      let len=x['length'];
      this.orderId=x[len-1]['orderId']
    });
  }

}
