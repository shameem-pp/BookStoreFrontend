import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { MediaMatcher } from '@angular/cdk/layout';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { GlobalDataService } from 'src/app/Service/global-data.service';
import { BookService } from 'src/app/Service/book.service';
import { UserService } from 'src/app/Service/user.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  cartCount=0;
  books:any;
  showCartPage:boolean=false;
  constructor(
    private userService:UserService,
    changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private dataService:GlobalDataService,private snackBar: MatSnackBar, private router: Router) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener); }

  ngOnInit(): void {
    this.dataService.shareShowCartPage.subscribe(x=>this.showCartPage=x);
    this.dataService.shareCartCount.subscribe(x=>this.cartCount=x);
  }
  navigateToSignIn(){
    localStorage.setItem('token','');
    localStorage.setItem('email','');
    this.router.navigate(['login']);
  }
  // isSignedIn(){
  //   if(this.userService.isLoggedIn()){
  //     return true;
  //   }
  //   else{
  //     return false;
  //   }
  // }
  // setCartCount(event){
  //   this.cartCount=event;
  // }

  mobileQuery: MediaQueryList;
  private _mobileQueryListener: () => void;

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }
  onSearchChange(searchValue: string): void {
    this.dataService.updateSearchText(searchValue);
  }


}
