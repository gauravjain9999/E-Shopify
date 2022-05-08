import {Component, Injectable, NgModule} from '@angular/core';
import {MatPaginatorIntl, MatPaginatorModule} from '@angular/material/paginator';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: ('root')
})
export class CustomPaginatorIntl implements MatPaginatorIntl {

  changes = new Subject<void>();
  changeSize: number;
  itemsPerPageLabel: string;
  lastPageLabel: string;
  firstPageLabel: string;
  nextPageLabel: string;
  previousPageLabel: string;
  of: string;

  constructor(){

    this.itemsPerPageLabel =   `Items per page:`
    this.lastPageLabel     =    `Last Page`,
    this.firstPageLabel    =    `First Page`,
    this.nextPageLabel     =    `Next Page`,
    this.of                =    `of`,
    this.previousPageLabel =    `Previous Page`

  };

  getRangeLabel(page: number, pageSize: number, length: number): string {

      if(length === 0) {
          return `Page 0 of 0`;
    }
    const totalPages = Math.ceil(length / pageSize);
    return `Page ${page + 1} of ${totalPages}`;
  }
};
