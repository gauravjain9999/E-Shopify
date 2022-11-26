import {Injectable} from '@angular/core';
import {MatPaginatorIntl} from '@angular/material/paginator';
import { TranslateService } from '@ngx-translate/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: ('root')
})
export class CustomPaginatorIntl implements MatPaginatorIntl {

  changes = new Subject<void>();
  itemsPerPageLabel: string;
  page: string;
  lastPageLabel: string;
  firstPageLabel: string;
  nextPageLabel: string;
  previousPageLabel: string;
  of: string;
  myPage: Array<any>;
  currentLang: any;
  myTranslateArray: Array<any>;

  constructor(public translateService: TranslateService){

    this.currentLang =  translateService.getBrowserLang();
    // this.onTranslateChange();
    // this.getDefaultTranslateChange();
    this.itemsPerPageLabel =   'Items per page:';
    this.lastPageLabel     =    'Last Page',
    this.firstPageLabel    =    'First Page',
    this.nextPageLabel     =    'Next Page',
    this.of                =    'of',
    this.previousPageLabel =    'Previous Page';

  }

  onTranslateChange(){
    this.translateService.onLangChange.subscribe((translation) => {
      const translateArr: any = [];
      translateArr.push(this.changeTranslate(translation.translations));
      this.myPage = [...translateArr];
    });
  }

  getDefaultTranslateChange(){
    this.translateService
    .getTranslation(this.currentLang)
    .subscribe((currTranslation) => {
      const currArr:any = [];
      currArr.push(this.changeTranslate(currTranslation));
      this.myPage = [...currArr];
    });
  }

  changeTranslate(translate: any){
    return this.myTranslateArray = [
      this.itemsPerPageLabel = translate.ITEMS_PER_PAGE,
      this.lastPageLabel = translate.LAST_PAGE,
      this.firstPageLabel = translate.FIRST_PAGE,
      this.of = translate.OF,
      this.nextPageLabel = translate.NEXT_PAGE,
      this.page = translate.PAGE,
      this.previousPageLabel = translate.PREVIOUS_PAGE
    ];
  }

  getRangeLabel(page: number, pageSize: number, length: number): string {

      if(length === 0) {
          return 'Page 0 of 0';
    }
    const totalPages = Math.ceil(length / pageSize);
    return `Page ${page + 1} of ${totalPages}`;
  }
}
