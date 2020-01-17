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

  putDataWithoutKey(formdata,url:string) {
    console.log(formdata);
    return this.http.put(environment.apiURL + '/' + url ,formdata).toPromise();
  }

  putData(formdata,url:string,key:string) {
    return this.http.put(environment.apiURL + '/' + url + "/" + key,formdata).toPromise();
  }

  putData2(formdata,url:string,key1:string,key2:string) {
    return this.http.put(environment.apiURL + '/' + url + "/" + key1 + "/" + key2,formdata).toPromise();
  }

  deleteData(url:string,id:string){
    return this.http.delete(environment.apiURL + '/' + url + '/' + id).toPromise();
  }

  deleteData2(url:string,id1:string,id2:string){
    return this.http.delete(environment.apiURL + '/' + url + '/' + id1 + "/" + id2).toPromise();
  }

  getDataById(url:string,id:string){
    return this.http.get(environment.apiURL + '/' + url + "/" + id).toPromise();
  }

  getAllData(url:string){
    return this.http.get(environment.apiURL + '/' + url).toPromise();
  }

  getDataByTwoParam(url:string,key1:string,key2:string){
    return this.http.get(environment.apiURL + '/' + url + '/' + key1 + '/' + key2).toPromise();
  }

  getDataByThreeParam(url:string,key1:string,key2:string,key3:string){
    return this.http.get(environment.apiURL + '/' + url + '/' + key1 + '/' + key2 + '/' + key3).toPromise();
  }
}
