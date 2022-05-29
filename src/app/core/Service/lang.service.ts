import { EventEmitter, Injectable } from '@angular/core';
import { TranslateService, LangChangeEvent } from '@ngx-translate/core';
import { Language } from '../../ModelDataClass/lang.model';

@Injectable({ providedIn: 'root' })
export class LanguageService {
    lang = Object.keys(Language);
    selectedLanguage = this.lang[0];
    languageName = Object.values(Language)[0];
    onTranslationChange = new EventEmitter();

  constructor(private translateService: TranslateService ) {
    this.translateService.getTranslation(this.translateService.defaultLang).subscribe((event: LangChangeEvent) => {
    this.onTranslationChange.emit(event);
  });

   this.translateService.onLangChange.subscribe((event: LangChangeEvent) => {
        if(event.translations) {
          this.onTranslationChange.emit(event.translations);
        }
      });
  }


}
