import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalDataService } from 'src/app/Service/global-data.service';
import { BookService } from 'src/app/Service/book.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { CartModel } from 'src/app/models/cart-model';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  @Input() cartCount: number;
  isCartEmpty:boolean;
  cartBooks: any;
  showCustomerDetails = false;
  errorMsg: string = ''
  cartModel: CartModel = new CartModel();
  constructor(private router: Router, private bookService: BookService, private dataService: GlobalDataService, private spinner: NgxSpinnerService) { }

  ngOnInit(): void {
    this.dataService.shareCartData.subscribe(
      x => {
        this.cartBooks = x;
      }
    );
    this.dataService.shareCartEmpty.subscribe(x=>this.isCartEmpty=x)
  }
  navigateToHomePage() {
    this.dataService.updateshowCartPage(false);
    this.router.navigate(['home']);
  }
  placeOrder() {
    this.spinner.show();
    this.showCustomerDetails = true
    let data: CartModel[] = []
    for (let index = 0; index < this.cartBooks['length']; index++) {
      this.cartModel = {
        customerEmail: localStorage.getItem('email'),
        cartId: this.cartBooks[index]['cartId'],
        bookId: this.cartBooks[index]['bookId'],
        quantity: this.cartBooks[index]['quantity']
      }
      data.push(this.cartModel)
    }
    this.bookService.updateCartBook('api/cart', data).subscribe
      (
        res => {
          this.getCustomerInfo();
          this.spinner.hide();
        },
        err => {
          this.getCustomerInfo();
          this.spinner.hide();
        }
      )
  }

  private getCustomerInfo() {
    this.bookService.getCustomerInfo('api/CustomerDetails?email='+localStorage.getItem('email')+'&type=work').subscribe(res => {
      console.log(res);
        this.dataService.updateCustomerInfo(res);
    }, err => {
    });
  }

  removeBookFromCart(data) {
    console.log(this.cartCount)
    this.deleteBookFromCart(data);
  }

  private deleteBookFromCart(data: any) {
    this.bookService.deleteCartBook('api/cart/' + data['bookId']).subscribe(res => {
      this.getAllCartBook();
    }, err => {
    });
  }

  private getAllCartBook() {
    this.bookService.getAllCartBook('api/cart?email=' + localStorage.getItem('email')).subscribe(
      res => {
        this.cartBooks = res;
        this.dataService.updateCartData(this.cartBooks);
        this.dataService.updateCartCount(this.cartBooks['length']);
      }, err => {

      });
  }

  quantity(data) {
    for (let index = 0; index < this.cartBooks['length']; index++) {
      if (data['bookId'] == this.cartBooks[index].bookId) {
        return this.cartBooks[index].quantity
      }
    }
  }
  decrementQuantity(data) {
    this.errorMsg = ''
    for (let index = 0; index < this.cartBooks['length']; index++) {
      if (this.cartBooks[index].cartId == data['cartId']) {
        if (this.cartBooks[index].quantity != 1) {
          this.cartBooks[index].quantity--;
        }
        else {
          // this.errorMsg="*Required Minimum Quantity";
          break
        }
      }
    }
  }

  incrementQuantity(data) {
    this.errorMsg = ''
    for (let index = 0; index < this.cartBooks['length']; index++) {
      if (this.cartBooks[index].cartId == data['cartId']) {
        if (this.cartBooks[index].quantity != this.cartBooks[index].totalNumberOfBooks) {
          this.cartBooks[index].quantity++;
        }
        else {
          this.errorMsg = "Exeeded the limit !!"
          setTimeout(() => { this.errorMsg = ''; }, 3000);
        }
      }
    }
  }
}
