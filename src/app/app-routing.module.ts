import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { HomePageComponent } from './Component/home-page/home-page.component';
import { BooksComponent } from './Component/books/books.component';
import { CartComponent } from './Component/cart/cart.component';
import { AuthGuard } from './auth.guard';
import { CheckoutComponent } from './Component/checkout/checkout.component';


const routes: Routes = [
  {path:'login',component:LoginComponent},
  {path:'registration',component:RegisterComponent},
  {path:'',redirectTo: '/home', pathMatch: 'full'},
  {path:'checkout',component:CheckoutComponent},
  {path:'home',component:HomePageComponent,children:[{path:'cart',component:CartComponent}]}
  // ,children:[
  //   {path:'cart',component:CartComponent},
  //   {path:'books',component:BooksComponent}
  // ]
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
