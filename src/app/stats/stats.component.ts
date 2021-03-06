import { Component, EventEmitter, OnInit } from '@angular/core';
import { MatDatepickerInputEvent } from '@angular/material/datepicker';
import { MatDateRangePickerInput } from '@angular/material/datepicker/date-range-picker';
import { ChartType } from 'chart.js';
import { Label, MultiDataSet } from 'ng2-charts';
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

  columnsPerUser1: string[] = ['avatar','name','min','max','average'];
  columnsPerUser2: string[] = ['avatar','name','total','count'];
  
  constructor(public statsService:StatsService, public configService:ConfigService) { }

  setFilterDate(): void {
    console.log(this.selectedStartDate);
    this.statsService.filter.startDate = new Date(this.selectedStartDate);
    this.statsService.filter.endDate = new Date(this.selectedEndDate);
    this.statsService.update();
  }

  changeStartDate(event: MatDatepickerInputEvent<Date, unknown>): any {
    this.selectedStartDate = event.value;
    this.setFilterDate();
  }

  changeEndDate(event: MatDatepickerInputEvent<Date, unknown>): any {
    this.selectedEndDate = event.value;
    this.setFilterDate();
  }

  perUserChartClicked(e:any): any {
    console.log(e);
    console.log(e.active[0]._datasetIndex + " " + e.active[0]._index);
  }

  perCategoryChartClicked(e:any): any {
    console.log(e);
    console.log(e.active[0]._datasetIndex + " " + e.active[0]._index);
  }

  ngOnInit(): void {
  }


}
