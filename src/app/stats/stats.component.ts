import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats',
  templateUrl: './stats.component.html',
  styleUrls: ['./stats.component.scss']
})
export class StatsComponent implements OnInit {

  public selectedStartDate:Date;
  public selectedEndDate:Date;

  constructor() { }

  ngOnInit(): void {
  }

  public lastYearClicked()
  {
    let now:Date = new Date();

    this.selectedStartDate = new Date(now.getFullYear()-1, 0,1);
    this.selectedEndDate = new Date(now.getFullYear()-1, 11,31);
  }
  public thisYearClicked()
  {
    
    let now:Date = new Date();

    this.selectedStartDate = new Date(now.getFullYear(), 0,1);
    this.selectedEndDate = new Date(now.getFullYear(), 11,31);
  }
  public lastMonthClicked()
  {

    let now:Date = new Date();

    this.selectedStartDate = new Date(now.getFullYear(), now.getMonth()-1,1);
    this.selectedEndDate = new Date(now.getFullYear(), now.getMonth(),0);
  }
  public thisMonthClicked()
  {

    let now:Date = new Date();

    this.selectedStartDate = new Date(now.getFullYear(), now.getMonth(),1);
    this.selectedEndDate = new Date(now.getFullYear(), now.getMonth()+1,0);
  }

}
