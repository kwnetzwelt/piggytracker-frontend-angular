import { Component, OnInit } from '@angular/core';
import { TargetsService } from '../targets.service';

@Component({
  selector: 'app-targets',
  templateUrl: './targets.component.html',
  styleUrls: ['./targets.component.scss']
})
export class TargetsComponent implements OnInit {

  constructor(targetService:TargetsService) { }

  ngOnInit(): void {
  }

}
