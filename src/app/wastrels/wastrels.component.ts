import { Component, OnInit } from '@angular/core';
import { RankingService } from '../ranking.service';
import { ConfigService } from '../config.service';


@Component({
  selector: 'app-wastrels',
  templateUrl: './wastrels.component.html',
  styleUrls: ['./wastrels.component.scss']
})
export class WastrelsComponent implements OnInit {

  constructor(public rankingService: RankingService, public configService: ConfigService) { }

  displayedColumns: string[] = ['position','avatar','name','total','delta'];
  ngOnInit(): void {
  }

}
