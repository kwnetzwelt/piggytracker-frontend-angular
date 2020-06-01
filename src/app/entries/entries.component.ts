import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EntriesService } from '../entries.service';
import { Entry } from '../api.service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EntriesComponent implements OnInit {

  public entries: Entry[];
  constructor(entriesService: EntriesService) {

    this.entries = [...entriesService.entries];
    entriesService.onEntryAdded.subscribe((e) => this.entries = [...entriesService.entries]);
    entriesService.onEntryChanged.subscribe((e) => this.entries = [...entriesService.entries]);
    entriesService.onEntryRemoved.subscribe((e) => this.entries = [...entriesService.entries]);

   }

  ngOnInit(): void {
  }

}
