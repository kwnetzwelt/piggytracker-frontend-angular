import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EntriesService } from '../entries.service';
import { Entry } from '../api.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddEntryDialogComponent } from '../add-entry-dialog/add-entry-dialog.component';
import { EditEntryDialogComponent } from '../edit-entry-dialog/edit-entry-dialog.component';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EntriesComponent implements OnInit {

  public entries: Entry[];
  constructor(entriesService: EntriesService, private bottomSheet: MatBottomSheet) {

      this.entries = [...entriesService.entries];
      entriesService.onEntryAdded.subscribe((e) => this.entries = [...entriesService.entries]);
      entriesService.onEntryChanged.subscribe((e) => this.entries = [...entriesService.entries]);
      entriesService.onEntryRemoved.subscribe((e) => this.entries = [...entriesService.entries]);

    }
    openEditDialog(entry: Entry): void {
      let ref = this.bottomSheet.open(EditEntryDialogComponent, { data: entry });
    }
    openAddDialog(): void {
      let ref = this.bottomSheet.open(AddEntryDialogComponent);

    }

    ngOnInit(): void {
    }

}
