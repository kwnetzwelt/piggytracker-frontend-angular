import { Component, OnInit } from '@angular/core';
import { AddEntryDialogComponent } from '../add-entry-dialog/add-entry-dialog.component';

@Component({
  selector: 'app-edit-entry-dialog',
  templateUrl: './edit-entry-dialog.component.html',
  styleUrls: ['./edit-entry-dialog.component.scss']
})
export class EditEntryDialogComponent extends AddEntryDialogComponent {


  public ok(): void {
    this.bottomSheetRef.dismiss(0);
    this.logService.log("ok");
    this.entrysService.putEntry(this.data);
  }
}
