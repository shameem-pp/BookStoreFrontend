import { Component, OnInit, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { GlobalDataService } from 'src/app/Service/global-data.service';
import { BookService } from 'src/app/Service/book.service';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-customer-details',
  templateUrl: './customer-details.component.html',
  styleUrls: ['./customer-details.component.scss']
})
export class CustomerDetailsComponent implements OnInit {
  customerDetails: FormGroup;
  customerInfo: any;
  clicked: boolean;
  constructor(private dataService:GlobalDataService,private bookServce:BookService, private spinner: NgxSpinnerService) { }
  @Input() showCustomerDetails:boolean;
  ngOnInit(): void {
    this.customerDetails=new FormGroup({
      name:new FormControl('',[Validators.required]),
      phone:new FormControl('',[Validators.required]),
      pinCode:new FormControl('',[Validators.required]),
      locality:new FormControl('',[Validators.required]),
      address:new FormControl('',[Validators.required]),
      city:new FormControl('',[Validators.required]),
      landmark:new FormControl('',[Validators.required]),
      type:new FormControl('',[Validators.required])
    });

    this.dataService.shareCustomerInfo.subscribe(x=>{
      this.customerInfo=x;
      if(this.customerInfo!=null){
       this.setValuesToCustomerData(this.customerInfo);
      }
    });

  }
  onTypeChange(){
  }
  updateCustomerInfo(){
    if(this.customerDetails.valid&&this.customerDetails.get('type').value!='work'){
      let data={
        name:this.customerDetails.get('name').value,
        phoneNumber:this.customerDetails.get('phone').value,
        pinCode:this.customerDetails.get('pinCode').value,
        locality:this.customerDetails.get('locality').value,
        address:this.customerDetails.get('address').value,
        city:this.customerDetails.get('city').value,
        landmark:this.customerDetails.get('landmark').value,
        type:this.customerDetails.get('type').value
      }
      this.bookServce.addCustomerInfo('api/CustomerDetails',data).subscribe(res=>{
        this.showOrderInfo();
      })

    }
    this.showOrderInfo();

    this.clicked=true;
  }

  private showOrderInfo() {
    this.dataService.shareCartData.subscribe(x => {
      this.dataService.updateShowOrderDetail(true);
    });
  }

  setValuesToCustomerData(value){
    this.customerDetails.get('name').setValue(value['name']);
    this.customerDetails.get('phone').setValue(value['phoneNumber']);
    this.customerDetails.get('pinCode').setValue(value['pinCode']);
    this.customerDetails.get('locality').setValue(value['locality']);
    this.customerDetails.get('address').setValue(value['address']);
    this.customerDetails.get('city').setValue(value['city']);
    this.customerDetails.get('landmark').setValue(value['landmark']);
    this.customerDetails.get('type').setValue(value['type']);
  }
}
