import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import 'rxjs';
import { Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';


@Injectable()
export class HnBuyersApiService {

  private baseUrl = 'https://hn-buyers-app-i2.firebaseio.com';
  currentDepartment: any = {};

  // we use this as a dictionary 
  // every time a deparment is selected we will put it in 
  // the departmentData dictionary.
  private departmentData = {};

  constructor(public http: Http) {
    console.log('Hello HnBuyersApiService Provider');
  }

  /// Using Promises
  getDepartments() {
    return new Promise(resolve => {
        this.http.get(`${this.baseUrl}/departments.json`)
            .subscribe(res => resolve(res.json()));
    });
  }

  /// using RxJs
  /// gets all the data for that department 
  // getDepartmentData(departmentId) : Observable<any> {
  //     return this.http.get(`${this.baseUrl}/departments-data/${departmentId}.json`)
  //         .map((response: Response) => {
  //             this.currentDepartment = response.json();
  //             return this.currentDepartment;
  //         });

      
  // }

    getDepartmentData(departmentId, forceRefresh: boolean = false) : Observable<any> {
      
      if (!forceRefresh && this.departmentData[departmentId]) {
        this.currentDepartment = this.departmentData[departmentId];
        console.log('**no need to make HTTP call, just to return the data');
        return Observable.of(this.currentDepartment);
      }
      
      // if we don't have the data yet 
      console.log('**about to make HTTP call');
      return this.http.get(`${this.baseUrl}/departments-data/${departmentId}.json`)
          .map((response: Response) => {
              this.departmentData[departmentId] = response.json();
              this.currentDepartment = response.json();
              return this.currentDepartment;
          });
  }

  getCurrentDepartment() {
      return this.currentDepartment;
  }

  refreshCurrentDepartment(){
    console.log('this.currentDepartment', this.currentDepartment);
    return this.getDepartmentData(this.currentDepartment.department.id, true);
  }

}
