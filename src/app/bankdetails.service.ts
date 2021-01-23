import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';
import { HttpErrorResponse, HttpParams } from '@angular/common/http';


import { Observable, throwError } from 'rxjs'
// import 'rxjs/add/operator/catch';
// import 'rxjs/add/operator/do';
@Injectable({
  providedIn: 'root'
})
export class BankdetailsService {
  private baselurl = "https://rest-fyle.herokuapp.com/api/branches/"

  constructor(private http:HttpClient) { }


private handleError(err:HttpErrorResponse){
  console.log('Handle http error');
  console.log(err.message);
  throw throwError(err)
}

public getBanks(): any {

return this.http.get<any>(this.baselurl);

}


}