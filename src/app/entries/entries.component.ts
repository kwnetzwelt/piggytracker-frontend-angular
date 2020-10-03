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

  public entries: Entry[] = [];
  constructor(public entriesService: EntriesService, private bottomSheet: MatBottomSheet) {
    this.entries = [...this.entriesService.entries];
    this.entriesService.onEntryAdded.subscribe((e) => {this.addEntry(e);});
    this.entriesService.onEntryChanged.subscribe((e) => {this.updateEntry(e);});
    this.entriesService.onEntryRemoved.subscribe((e) => {this.deleteEntry(e);});
    }
    addEntry(e: Entry)
    {
      if(e)
      {
        this.entries = [...this.entriesService.entries]; // push will not update the view
        this.entries.sort((b,a) => a.date.getTime() - b.date.getTime());

      }
    }
    updateEntry(e: Entry)
    {
      if(e)
      {
        const id = this.entries.findIndex((f) => f._id === e._id);
        this.entries[id] = e;
        this.entries.sort((a,b) =>
        a.date.getTime() - b.date.getTime());
      }
    }
    deleteEntry(e: Entry)
    {
      if(e)
      {
        const id = this.entries.findIndex((f) => f._id === e._id);
        this.entries = this.entries.splice(id,1);
      }
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
