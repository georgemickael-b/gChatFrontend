import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import { NgModule } from '@angular/core';
import {MatTabsModule} from '@angular/material/tabs';
import {MatListModule} from '@angular/material/list';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {MatSnackBarModule} from '@angular/material/snack-bar';





@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatTabsModule, MatListModule,MatToolbarModule,MatInputModule,MatCardModule,MatSnackBarModule],
  exports: [MatButtonModule, MatCheckboxModule, MatTabsModule, MatListModule,MatToolbarModule,MatInputModule,MatCardModule,MatSnackBarModule]
})
export class MaterialUIModule { }