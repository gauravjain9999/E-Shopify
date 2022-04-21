import {NgModule } from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatIconModule} from '@angular/material/icon';
import {MatDialogModule} from '@angular/material/dialog';
import {MatButtonModule} from '@angular/material/button';
import {MatButtonToggleModule} from '@angular/material/button-toggle';
import {MatSliderModule} from '@angular/material/slider';
import {MatPaginatorModule} from '@angular/material/paginator';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatSelectModule} from '@angular/material/select';
import {MatDivider, MatDividerModule} from '@angular/material/divider';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner'
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatFormFieldModule} from '@angular/material/form-field';
import {FlexLayoutModule } from '@angular/flex-layout';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {MatNativeDateModule} from '@angular/material/core';
import {MatChipsModule} from '@angular/material/chips';
import {MatTooltipModule} from '@angular/material/tooltip';

const customClassModule = [

    MatIconModule,
    MatSliderModule,
    MatDialogModule,
    MatInputModule,
    MatChipsModule,
    MatButtonToggleModule,
    MatButtonModule,
    MatAutocompleteModule,
    MatFormFieldModule,
    MatDividerModule,
    MatSelectModule,
    MatExpansionModule,
    MatNativeDateModule,
    FlexLayoutModule,
    MatTooltipModule,
    MatSnackBarModule,
    MatDatepickerModule,
    MatSidenavModule,
    MatPaginatorModule,
    MatProgressSpinnerModule

];

@NgModule({

  imports: [
    CommonModule,
    customClassModule

  ],
  exports: [
    customClassModule
  ]
})
export class MaterialModule { }
