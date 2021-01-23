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
  // favourites: number[]
  // selectedLevel;
  
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
    //update the ui
    this.selectedCity = event.target.value;
    this.search(this.selectedCity)
  }
  search(selectedValue: string) {
    selectedValue = selectedValue.trim(); // Remove whitespace
  selectedValue = selectedValue.toLowerCase(); // MatTableDataSource defaults to lowercase matches
   this.dataSource.filter = selectedValue;
   
}
// selected(){
//   alert(this.selectedLevel.name)
// }

  constructor(private _bankHttpService: BankdetailsService,private _favouriteService: FavouriteService) {
    this._favouriteService.loadFavourites("SAMPLE");
    this._bankHttpService.getBanks().subscribe(
      
      (branches) => {
      // console.log(branches)
      const favourites: number[] = this._favouriteService.returnFavourites();
      for (let i = 0; i < branches.length; i++) {
        if (favourites.indexOf(branches[i].address) > -1) {
          // Amend the branch object to mark it as a favourite
          console.log(branches[i]);
          branches[i] = {...branches[i], favourite: 'True'}
       }
      }
      this.dataSource = new MatTableDataSource(branches);
      this.dataSource.paginator = this.paginator;
      console.log(this.dataSource);
    });

    
  }
  
  restore(){
    this._bankHttpService.getBanks().subscribe(
      
      (branches) => {
      // console.log(branches)
      const favourites: number[] = this._favouriteService.returnFavourites();
      for (let i = 0; i < branches.length; i++) {
        if (favourites.indexOf(branches[i].address) > -1) {
          // Amend the branch object to mark it as a favourite
          // console.log(branches[i]);
          branches[i] = {...branches[i], favourite: true}
       }
      }
      
    });
}

  applyFilter(filterValue: string) {
    filterValue = filterValue.trim(); // Remove whitespace
    filterValue = filterValue.toLowerCase(); // Datasource defaults to lowercase matches
    this.dataSource.filter = filterValue;
  }

  ngOnInit(): void {
    this.dataSource=this.projects;
    this.restore();
    
    
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
    // const favourites: number[] = 
    this._favouriteService.loadFavourites(row.address);
    this.restore();
     console.log(row.address)
    //  this.refresh();
    //  this.table.renderRows();
   }
   
  }
  


export interface Branch {
  address: string;
  // bank:string;
  bank_id: number;
  branch: string;
  city: string;
  district: string;
  ifsc: string;
  state: string;
}