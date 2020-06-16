import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoginComponent } from './Component/login/login.component';
import { RegisterComponent } from './Component/register/register.component';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatCardModule} from '@angular/material/card';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import { UserService } from './Service/user.service';
import { HttpService } from './Service/http.service';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule} from '@angular/material/input';
import {HttpClientModule} from '@angular/common/http';
import { HomePageComponent } from './Component/home-page/home-page.component'
import { BookService } from './Service/book.service';
import {MatToolbarModule} from '@angular/material/toolbar';
import { BooksComponent } from './Component/books/books.component';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule, MatSelect} from '@angular/material/select';
import {NgxPaginationModule} from 'ngx-pagination';
import { CartComponent } from './Component/cart/cart.component';
import { GlobalDataService } from './Service/global-data.service';
import { AuthGuard } from './auth.guard';
import { CustomerDetailsComponent } from './Component/customer-details/customer-details.component';
import { OrderSummaryComponent } from './Component/order-summary/order-summary.component';
import {MatRadioModule} from '@angular/material/radio';
import { NgxSpinnerModule } from "ngx-spinner";
import {FlexLayoutModule} from '@angular/flex-layout';
import { CheckoutComponent } from './Component/checkout/checkout.component';
import { FilterPipe } from './filter.pipe'

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HomePageComponent,
    BooksComponent,
    CartComponent,
    CustomerDetailsComponent,
    OrderSummaryComponent,
    CheckoutComponent,
    FilterPipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    HttpClientModule,
    MatToolbarModule,
    MatSidenavModule,
    MatSelectModule,
    NgxPaginationModule,
    MatRadioModule,
    NgxSpinnerModule,
    FlexLayoutModule
  ],
  providers: [
    UserService,
    HttpService,
    BookService,
    AuthGuard,
    GlobalDataService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
