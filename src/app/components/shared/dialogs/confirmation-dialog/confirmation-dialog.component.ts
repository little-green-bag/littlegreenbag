import { Component, Inject, OnInit, Optional } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-confirmation-dialog',
  templateUrl: './confirmation-dialog.component.html',
  styleUrls: ['./confirmation-dialog.component.scss']
})
export class ConfirmationDialogComponent implements OnInit {
  action = "";
  local_data: any;
  product: any;
  constructor(
    public dialogRef: MatDialogRef<ConfirmationDialogComponent>,
    @Optional() @Inject(MAT_DIALOG_DATA) public data: any,
  ) {
    this.local_data = { ...data };
    this.action = this.local_data.action;
    this.product = this.local_data.product;
  }

  ngOnInit(): void {
    console.log('local_data is ', this.local_data);
  }

  onSubmit() {
    this.closeDialog({ type: { event: 'Submit' }, value: null });
  }

  onCancel() {
    this.closeDialog({ type: { event: 'Cancel' }, value: null });
  }

  closeDialog({ type, value }) {
    this.dialogRef.close({ type, value });
  }
}
