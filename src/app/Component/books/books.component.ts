import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { BookService } from 'src/app/Service/book.service';
import { Books } from 'src/app/models/books';
import { GlobalDataService } from 'src/app/Service/global-data.service';
import { NgxSpinnerService } from "ngx-spinner";
import { Cart } from 'src/app/models/cart';

@Component({
  selector: 'app-books',
  templateUrl: './books.component.html',
  styleUrls: ['./books.component.scss']
})
export class BooksComponent implements OnInit {
  books: any;
  p: number = 1;
  cartCount: number = 0;
  toggleButton: boolean = false;
  numberOfBook: number;
  selected="Newest Arrivals";
  searchText: string;
  constructor(private bookService: BookService,private dataService: GlobalDataService,private spinner: NgxSpinnerService) { }
  addedToBag:Books[]=[];
  book: Books = new Books();
  cartData:any
  loading=false;
  ngOnInit(): void {
    this.getAllBook();
    this.getAllCartBook();
    this.dataService.shareSearchText.subscribe(x=>{
      this.searchText=x;
      if(this.searchText!=''){
        this.search();
      }
    });
  }
  search(){
  }
  onClickAddToBag(book) {
    this.dataService.updateIsCartEmpty(false);
    this.spinner.show();
    let data={
      id:0,
      customerEmail:localStorage.getItem('email'),
      bookId:book['id'],
      quantity:1
    }

    this.bookService.addBookToCart('api/cart',data).subscribe(
      res=>{
        this.getAllCartBook();
        
        this.spinner.hide();
      },
      err=>{
        this.spinner.hide();
      }
    )
  }

  private getAllCartBook() {
    this.bookService.getAllCartBook('api/cart/?email='+localStorage.getItem('email')).subscribe(res => {
      this.cartData = res;
      for (let index = 0; index < res['length']; index++) {
          let item={
            auther:res[index]['auther'],
            bookDetail:res[index]['bookDetail'],
            bookName:res[index]['bookName'],
            coverPhoto:res[index]['coverPhoto'],
            id:res[index]['bookId'],
            price:res[index]['price'],
            totalNumberOfBooks:res[index]['totalNumberOfBooks']
          }
          this.addedToBag.push(item);
      }
      this.dataService.updateCartData(this.cartData);
      this.dataService.updateCartCount(this.cartData['length']);
      this.dataService.shareCartCount.subscribe(x=>this.cartCount=x);
    }, err => {
      this.spinner.hide();
    });
  }

  isContains(book) {
    let flag=0;
    for (let index = 0; index < this.addedToBag.length; index++) {
      if(book['id']==this.addedToBag[index].id){
        flag=1
      }
    }
    if(flag==1){
      return true;
    }
    return false
  }
  showBookDetail(book) {
    this.book.bookDetail = book.bookDetail;
    this.book.totalNumberOfBooks = book.totalNumberOfBooks;
    
    setTimeout(()=>console.log(" "),1000)
  }
  hideBookDetail(book) {
    this.book.bookDetail = '';
    this.book.totalNumberOfBooks = 0;
  }
  comparePriceLH(a,b){
    const priceA=a.price;
    const priceB=b.price;
    if(priceA>priceB){
      return 1
    }
    else if(priceA==priceB){  
      return 0
    }
    else{
      return -1
    }
  }

  compareRel(a,b){
    const idA=a.id;
    const idB=b.id;
    if(idA>idB){
      return -1
    }
    else if(idA==idB){  
      return 0
    }
    else{
      return 1
    }
  }

  comparePriceHL(a,b){
    const priceA=a.price;
    const priceB=b.price;
    if(priceA>priceB){
      return -1
    }
    else if(priceA==priceB){  
      return 0
    }
    else{
      return 1
    }
  }
  onChange(event){
    if(event.value=="lowToHigh"){
      this.books=this.books['sort'](this.comparePriceLH);  
    }
    else if(event.value=="highToLow"){
      this.books=this.books['sort'](this.comparePriceHL);
    }
    else if(event.value=="relevance"){
      this.books=this.books.sort(this.compareRel);
    }
    else{
      this.books=this.books.sort(this.compare)
    }
  }

compare(a,b){
  const idA=a.id;
  const idB=b.id;
  if(idA>idB){
    return 1
  }
  else if(idA==idB){  
    return 0
  }
  else{
    return -1
  }
}

  public getAllBook() {
    this.spinner.show();
    this.bookService.getAllBook('api/books/').subscribe
      (
        res => {
          this.books = res;
          this.dataService.updateBook(this.books);
          this.numberOfBook=Object.entries(res).length;
          this.spinner.hide();
          this.loading=true;
        },
        err => {
          this.spinner.hide();
        }
      );
  }
}
