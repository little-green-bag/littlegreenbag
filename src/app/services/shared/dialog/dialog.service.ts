import { Injectable } from '@angular/core';
import {
  MatDialog,
  MatDialogConfig,
  MatDialogRef,
} from '@angular/material/dialog';
import { ConfirmationDialogComponent } from '@components/shared/dialogs/confirmation-dialog/confirmation-dialog.component';
import { DialogComponent } from '@components/shared/dialog/dialog.component';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) { }

  openDialog(data?): MatDialogRef<DialogComponent> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;
    dialogConfig.data = data;
    dialogConfig.panelClass = 'mat-dialog-container-upgrade';
    const dialogRef = this.dialog.open(DialogComponent, dialogConfig);
    return dialogRef;
  }

  openConfirmationDialog(data?): MatDialogRef<ConfirmationDialogComponent> {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.data = data;
    dialogConfig.panelClass = 'mat-dialog-container-upgrade';
    const dialogRef = this.dialog.open(ConfirmationDialogComponent, dialogConfig);
    return dialogRef;
  }

}
