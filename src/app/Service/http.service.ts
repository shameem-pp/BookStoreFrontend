import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  constructor(private http:HttpClient) { }
  header = {
    headers: new HttpHeaders()
      .set('Authorization',  `Bearer ${localStorage.token}`)
  }
  public post(url:string,data:any){
    return this.http.post(environment.baseUrl+url,data,this.header);
  }

  public put(url:string,data:any){
    return this.http.put(environment.baseUrl+url,data,this.header);
  }

  public get(url:string){
    return this.http.get(environment.baseUrl+url,this.header);
  }

  public delete(url:string){
    return this.http.delete(environment.baseUrl+url,this.header);
  }
}
