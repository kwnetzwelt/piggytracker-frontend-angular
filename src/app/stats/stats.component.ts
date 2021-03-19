import { Component, OnInit } from '@angular/core';
import { ConfigService } from '../config.service';
import { StatsService } from '../stats.service';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  public selectedStartDate:Date;
  public selectedEndDate:Date;

  displayedColumns: string[] = ['avatar','name','min','max','average'];
  
  constructor(public statsService:StatsService, public configService:ConfigService) { }

  ngOnInit(): void {
  }


}
