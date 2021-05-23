import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import { MatBadgeModule } from '@angular/material/badge';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatTableModule } from '@angular/material/table';
import { MatCardModule } from '@angular/material/card';
import { MatListModule } from '@angular/material/list';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatDialogModule } from '@angular/material/dialog';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressBarModule } from '@angular/material/progress-bar';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressBarModule
  ],
  exports: [
    CommonModule,
    MatToolbarModule,
    MatIconModule,
    MatBadgeModule,
    MatFormFieldModule,
    MatSelectModule,
    MatInputModule,
    MatSnackBarModule,
    MatTableModule,
    MatSidenavModule,
    MatCardModule,
    MatListModule,
    MatGridListModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatDialogModule,
    MatPaginatorModule,
    MatProgressBarModule
  ],
})
export class MaterialModule { }
