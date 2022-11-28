import { EventEmitter, Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { GlobalConstant } from '../constant/globalConstant';

@Injectable({ providedIn: 'root' })
export class LanguageService {
  onTranslationChange = new EventEmitter();
  globalConstant = GlobalConstant;

  supportLanguages = [
    this.globalConstant.en,
    this.globalConstant.fr,
    this.globalConstant.ja,
    this.globalConstant.vi,
  ];

  languages = [
    {value : this.globalConstant.en, viewValue:  this.globalConstant.enLang},
    {value : this.globalConstant.fr, viewValue:  this.globalConstant.frLang},
    {value : this.globalConstant.ja, viewValue:  this.globalConstant.jaLang},
    {value : this.globalConstant.vi, viewValue:  this.globalConstant.viLang},
  ];

  constructor(private translateService: TranslateService ) {
    this.getTranslationLanguage();
    this.translationChange();
  }

  getTranslationLanguage() {
    this.translateService.getTranslation(this.translateService.defaultLang).subscribe((event: LangChangeEvent) => {
    this.onTranslationChange.emit(event);
  });
 }

  translationChange(){
   this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
      if(event.translations) {
        this.onTranslationChange.emit(event.translations);
      }
    });
  }
}
