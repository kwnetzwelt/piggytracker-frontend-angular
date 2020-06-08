import { Component, OnInit } from '@angular/core';
import { version } from '../../environments/version';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss']
})
export class VersionComponent implements OnInit {

  public version: {version: string, revision: string, branch: string} = version;

  constructor() { }

  ngOnInit(): void {
  }

}
