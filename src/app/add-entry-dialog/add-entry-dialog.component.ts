import { Component, OnInit, Inject } from '@angular/core';

import { MatBottomSheetRef, MAT_BOTTOM_SHEET_DATA } from '@angular/material/bottom-sheet';
import { Entry } from '../api.service';
import { isFormattedError } from '@angular/compiler';
import { EntriesService } from '../entries.service';
import { LogService } from '../log.service';
import { AuthService } from '../auth.service';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-add-entry-dialog',
  templateUrl: './add-entry-dialog.component.html',
  styleUrls: ['./add-entry-dialog.component.scss']
})
export class AddEntryDialogComponent {

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: Entry,
    public configService: ConfigService,
    public entrysService: EntriesService,
    public logService: LogService,
    public authService: AuthService,
    protected bottomSheetRef: MatBottomSheetRef<AddEntryDialogComponent>) {
    if (this.data === null){
      this.data = new Entry();
      this.data.remunerator = authService.getUserProfile().fullname;
    }
  }

  public delete(): void {
    this.bottomSheetRef.dismiss(0);
    this.logService.log("delete");
    this.entrysService.deleteEntry(this.data);
  }

  public ok(): void {
    this.bottomSheetRef.dismiss(0);
    this.logService.log("ok");
    this.entrysService.createEntry(this.data);
  }
  public cancel(): void {
    this.bottomSheetRef.dismiss(0);
    this.logService.log("cancel");
  }
  ngOnInit(): void {
  }

  public updateValue(event) {
    this.data.value = event.target.value;
  }
}
