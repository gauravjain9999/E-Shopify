import { AbstractControl, FormGroupDirective, NgForm, FormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class CustomErrorStateMatcherService implements ErrorStateMatcher{

  isErrorState(control: FormControl, form: FormGroupDirective){
    return ((control.invalid && control.dirty));
  }
}
