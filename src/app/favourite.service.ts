import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpClientModule } from '@angular/common/http';

import { HttpErrorResponse, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs'

@Injectable()
export class FavouriteService {

  private _favourites: string[] = [];
  
  constructor(private _http : HttpClient) {
   
  }

  public loadFavourites(address): any {
   
   
    if (localStorage.getItem("Fav")){
        this._favourites = JSON.parse(localStorage.getItem('Fav'));
        this._favourites = [address,...this._favourites]
    }
    
    localStorage.setItem("Fav",JSON.stringify(this._favourites))
    
   
  }
  public returnFavourites():any {
    var storedNames = JSON.parse(localStorage.getItem("Fav"));
    console.log(storedNames);
    
    return storedNames;
  }
}