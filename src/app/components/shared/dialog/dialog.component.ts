import { OnInit, Component, Inject, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ProductModel } from '@models/index';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent {
  action: string;
  local_data: any;

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: ProductModel
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
  }

  doAction() {
    this.dialogRef.close({ event: this.action, data: this.local_data });
  }

  closeDialog() {
    this.dialogRef.close({ event: 'Cancel' });
  }
}
