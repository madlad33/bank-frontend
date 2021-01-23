import { Component, OnInit, ViewChild } from '@angular/core';
import {MatTableDataSource,MatTable} from '@angular/material/table'
import {BankdetailsService} from '../bankdetails.service'
import {PageEvent,MatPaginator} from '@angular/material/paginator';
import { catchError, map } from 'rxjs/operators';
import {FavouriteService} from '../favourite.service'
import {FormControl} from '@angular/forms';
@Component({
  selector: 'app-banks-table',
  templateUrl: './banks-table.component.html',
  styleUrls: ['./banks-table.component.css']
})
export class BanksTableComponent implements OnInit {
  displayedColumns = [ 'favourite','ifsc','address', 'bank_id', 'city', 'district'];
  
  selectedCity: string = '';
  projects:any;
  dataSource: MatTableDataSource<Branch>;
  length = 100;
  pageSize = 10;
  pageSizeOptions: number[] = [5, 10, 25, 100];
  pageEvent: PageEvent;
  disableSelect = new FormControl(false);
  @ViewChild(MatPaginator) paginator:MatPaginator;
  @ViewChild(MatTable) table: MatTable<any>;
  setPageSizeOptions(setPageSizeOptionsInput: string) {
    if (setPageSizeOptionsInput) {
      this.pageSizeOptions = setPageSizeOptionsInput.split(',').map(str => +str);
    }
  }
  selectChangeHandler (event: any) {
    this.selectedCity = event.target.value;
    this.search(this.selectedCity)
  }
  search(selectedValue: string) {
    selectedValue = selectedValue.trim(); 
  selectedValue = selectedValue.toLowerCase(); 
   this.dataSource.filter = selectedValue;
   
}


  constructor(private _bankHttpService: BankdetailsService,private _favouriteService: FavouriteService) {
    this._favouriteService.loadFavourites("SAMPLE");
    this._bankHttpService.getBanks().subscribe(
      
      (branches) => {
      
      const favourites: number[] = this._favouriteService.returnFavourites();
      for (let i = 0; i < branches.length; i++) {
        if (favourites.indexOf(branches[i].address) > -1) {
          branches[i] = {...branches[i], favourite: 'True'}
       }
      }
      this.dataSource = new MatTableDataSource(branches);
      this.dataSource.paginator = this.paginator;
      // console.log(this.dataSource);
    });

    
  }
  

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); 
    filterValue = filterValue.toLowerCase(); 
    this.dataSource.filter = filterValue;
  }

  ngOnInit(): void {
    this.dataSource=this.projects;
    // this.restore();
    
    
  }
  ngAfterViewInit() {
   
   }
   refresh(): void{
    this._bankHttpService.getBanks().subscribe(resources => {
      this.dataSource.data = resources; 
      this.dataSource.paginator = this.paginator;
    });
    this.table.renderRows();
  }

   onRowClicked(row){
    this._favouriteService.loadFavourites(row.address);
  
   }
   
  }
  


export interface Branch {
  address: string;
  bank_id: number;
  branch: string;
  city: string;
  district: string;
  ifsc: string;
  state: string;
}