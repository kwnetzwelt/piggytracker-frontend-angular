import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { EntriesService } from '../entries.service';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EntriesComponent implements OnInit {

  constructor(public entriesService: EntriesService) { }

  ngOnInit(): void {
  }

}
