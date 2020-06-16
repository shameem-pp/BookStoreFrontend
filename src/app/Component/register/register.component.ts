import { Component, OnInit } from '@angular/core';
import { FormBuilder,FormGroup, Validators } from '@angular/forms'
import {UserService} from './../../Service/user.service';
import {MatSnackBar} from '@angular/material/snack-bar';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

user:FormGroup;
  loading: boolean=false;

  constructor(private fb:FormBuilder,private service:UserService,private snackBar: MatSnackBar,private router:Router) { }

  validation(){
    this.loading=true;
    let data={
      firstName:this.valueOfInputField('firstName'),
      lastName:this.valueOfInputField('lastName'),
      email:this.valueOfInputField('userName'),
      password:this.valueOfInputField('password')
    }
    this.service.register("api/account/Register",data).subscribe(
      response=>{
        this.loading=false;
     this.openSnackBar("successfull","Registration");
     this.router.navigate(['/login'])
    },
    error => {
      this.openSnackBar(error.toString(),"Registration");
      this.loading=false;

    });
  }

  valueOfInputField(inputElement:string){
    return this.user.get(inputElement).value;
  }

  openSnackBar(message: string, action: string) {
    this.snackBar.open(message, action, {
      duration: 2000,
    });
  }

  ngOnInit(): void {
    this.user =this.fb.group({
      firstName:['',
        [Validators.required,Validators.pattern('^[a-zA-z]+')]],
      lastName:['',
        [Validators.required,Validators.pattern('^[a-zA-z]+')]],
        userName:['',
        [Validators.required,Validators.email,Validators.pattern('^([a-zA-Z0-9_\\-\\.]+)@([a-zA-Z0-9_\\-\\.]+)\.([a-zA-Z]{2,5})$')]],
      password:['',
        [Validators.required,Validators.pattern('^([a-z0-9]+)')]],
      confirm:['',
        [Validators.required,Validators.pattern('^([a-z0-9]+)')]]});
  }



}
