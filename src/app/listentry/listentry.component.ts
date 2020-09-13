import { Component, OnInit, Input } from '@angular/core';
import { Entry } from '../api.service';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-listentry',
  templateUrl: './listentry.component.html',
  styleUrls: ['./listentry.component.scss']
})
export class ListentryComponent implements OnInit {

  @Input() public entry: Entry;
  constructor(public configService: ConfigService) { }

  ngOnInit(): void {
  }

}
