import { Component, OnInit, ViewEncapsulation, ViewChild } from '@angular/core';
import { EntriesService } from '../entries.service';
import { Entry } from '../api.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { AddEntryDialogComponent } from '../add-entry-dialog/add-entry-dialog.component';
import { EditEntryDialogComponent } from '../edit-entry-dialog/edit-entry-dialog.component';
import { CdkVirtualScrollViewport } from '@angular/cdk/scrolling';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EntriesComponent implements OnInit {

  @ViewChild(CdkVirtualScrollViewport, {static: false}) viewport: CdkVirtualScrollViewport;
  public entries: Entry[] = [];
  constructor(public entriesService: EntriesService, private bottomSheet: MatBottomSheet) {
    this.entries = [...this.entriesService.entries];
    this.entriesService.onEntryAdded.subscribe((e) => {this.addEntry(e);});
    this.entriesService.onEntryChanged.subscribe((e) => {
      if(e)
        this.updateEntry(e.current);
    });
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
        Entry.updateFromData(this.entries [id], e);
        this.entries.sort((b,a) =>
        a.date.getTime() - b.date.getTime());
      }
    }
    deleteEntry(e: Entry)
    {
      if(e)
      {
        this.entries = [...this.entriesService.entries]; // push will not update the view

        this.viewport.setRenderedRange({start: 0, end: this.viewport.getRenderedRange().end + 1});
        this.viewport.checkViewportSize();
      }
    }
    openEditDialog(entry: Entry): void {
      let editEntry = new Entry(entry);
      let ref = this.bottomSheet.open(EditEntryDialogComponent, { data: editEntry });
    }
    openAddDialog(): void {
      let ref = this.bottomSheet.open(AddEntryDialogComponent);

    }

    ngOnInit(): void {


    }

}
