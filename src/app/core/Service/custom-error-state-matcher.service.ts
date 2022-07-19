import { AbstractControl, FormGroupDirective, NgForm, UntypedFormControl } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

export class CustomErrorStateMatcherService implements ErrorStateMatcher{

  isErrorState(control: UntypedFormControl, form: FormGroupDirective){
    return ((control.invalid && control.dirty));
  }
}
