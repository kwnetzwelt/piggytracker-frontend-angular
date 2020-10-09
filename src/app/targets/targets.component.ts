import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { TargetsService, TargetsEntry } from '../targets.service';
import { ConfigService } from '../config.service';

@Component({
  selector: 'app-targets',
  templateUrl: './targets.component.html',
  styleUrls: ['./targets.component.scss']
})
export class TargetsComponent implements OnInit {

  public targets: TargetsEntry[] = [];
  constructor(targetService:TargetsService, public configService:ConfigService,
    @Inject(LOCALE_ID) public locale: string
    ) {

    targetService.onTargetsUpdate.subscribe((e) => {

      this.targets =[...e.values()];

    });

  }

  ngOnInit(): void {
  }


}
