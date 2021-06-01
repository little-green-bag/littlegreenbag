import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root',
})
export class NotificationsService {
  constructor(public _snackBar: MatSnackBar) { }

  openSnackBar(
    message: string,
    action?: string,
    className?: string,
    duration = 5000
  ) {
    this._snackBar.open(message, action, {
      duration,
      panelClass: className
    });
  }

  public warningAlert(message, action?) {
    this.openSnackBar(message, action, 'red-snackbar');
  }

  public successAlert(message, action?) {
    this.openSnackBar(message, action, 'green-snackbar');
  }
}
