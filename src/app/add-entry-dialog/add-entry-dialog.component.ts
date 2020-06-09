import { Component, OnInit, Inject } from '@angular/core';

import {MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA} from '@angular/material/bottom-sheet';
import { Entry } from '../api.service';
import { isFormattedError } from '@angular/compiler';
import { EntriesService } from '../entries.service';

@Component({
  selector: 'app-add-entry-dialog',
  templateUrl: './add-entry-dialog.component.html',
  styleUrls: ['./add-entry-dialog.component.scss']
})
export class AddEntryDialogComponent {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: Entry,
  public entrysService: EntriesService,
  private bottomSheetRef: MatBottomSheetRef<AddEntryDialogComponent>) {
    if(this.data === null)
      this.data = {} as Entry;
  }

  ngOnInit(): void {
  }

}
