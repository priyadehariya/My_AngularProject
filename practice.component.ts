import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { HomeComponent } from './../home/home.component';
 import { Component, OnInit, ViewChild } from '@angular/core';
 import {MatPaginator} from '@angular/material/paginator';

import { MatDialog, MatDialogRef } from '@angular/material/dialog';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},

];

/**
 * @title Basic use of `<table mat-table>`
 */


 export interface DialogData {
  animal: string;
  name: string;
}



 @Component({
   selector: 'app-practice',
   templateUrl: './practice.component.html',
   styleUrls: ['./practice.component.css']
 })



export class PracticeComponent implements OnInit {
public dataSource = new MatTableDataSource<any>();
selected = 'value';













animal!: string;
  name!: string ;


constructor(public dialog: MatDialog ,
  ) { }

  price=12345;

@ViewChild(MatSort)Sort! : MatSort;
   @ViewChild(MatPaginator)
   paginator!: MatPaginator;

//dialog
openDialog(): void {
  const dialogRef = this.dialog.open(HomeComponent, {
    width: '100%',
    data: {name: this.name, animal: this.animal},
  });

  dialogRef.afterClosed().subscribe(result => {
    console.log('The dialog was closed');
    this.animal = result;
  });
}
//sorting
  ngOnInit(): void {
 this.dataSource.data = ELEMENT_DATA;
  }
  ngAfterViewInit(): void {
    this.dataSource.sort = this.Sort;
    this.dataSource.paginator = this.paginator;

  }

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];



  }



