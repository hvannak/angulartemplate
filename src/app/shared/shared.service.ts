import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor(private http:HttpClient) { 

  }

  postData(formdata,url:string) {
    return this.http.post(environment.apiURL + '/' + url + '/', formdata).toPromise();
  }

  putData(formdata,url:string,key:string) {
    return this.http.put(environment.apiURL + '/' + url + "/" + key,formdata);
  }

  deleteData(url:string,id:string){
    return this.http.delete(environment.apiURL + '/' + url + '/' + id).toPromise();
  }

  getDataById(url:string,id:string){
    return this.http.get(environment.apiURL + '/' + url + "/" + id).toPromise();
  }

  getAllData(url:string){
    return this.http.get(environment.apiURL + '/' + url).toPromise();
  }
}
