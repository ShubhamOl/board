import { Component, Inject } from '@angular/core';
import { FormControl, FormGroupDirective, NgForm, Validators } from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

export interface DialogData{
  name: string;
  description?: string;
  mode: 'card'|'list';
}

export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    return !!(control && control.invalid && (control.dirty || control.touched));
  }
}

@Component({
  selector: 'app-common-dialog',
  templateUrl: './common-dialog.component.html',
  styleUrls: ['./common-dialog.component.css']
})
export class CommonDialogComponent  {
  nameValidator: FormControl =  new FormControl('', [Validators.required]);
  matcher = new MyErrorStateMatcher();

  constructor(
    public dialogRef: MatDialogRef<CommonDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

  onNoClick(): void {
    this.dialogRef.close();
  }
  onYesClick(): void {
    this.nameValidator.markAsTouched();
    if (this.nameValidator.value === null || this.nameValidator.value === undefined || this.nameValidator.value === ''){
      return;
    }
    this.data.name = this.nameValidator.value;
    this.dialogRef.close(this.data);
  }

}
