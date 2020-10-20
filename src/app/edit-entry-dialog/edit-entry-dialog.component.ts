import { Component, OnInit, Output, EventEmitter, ViewChild } from '@angular/core';
import { AddEntryDialogComponent } from '../add-entry-dialog/add-entry-dialog.component';
import { ConfigService } from '../config.service';
import { interval, BehaviorSubject, Subscription, timer } from 'rxjs';
import { MatRipple } from '@angular/material/core';


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

  public delete(): void {
    this.bottomSheetRef.dismiss(0);
    this.logService.log("delete");
    this.entrysService.deleteEntry(this.data);
  }

}
