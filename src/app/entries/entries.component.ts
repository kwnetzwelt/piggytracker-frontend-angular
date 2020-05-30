import { Component, OnInit, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-entries',
  templateUrl: './entries.component.html',
  styleUrls: ['./entries.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class EntriesComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

}
