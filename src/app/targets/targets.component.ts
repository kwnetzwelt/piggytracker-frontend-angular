import { Component, OnInit, LOCALE_ID, Inject } from '@angular/core';
import { TargetsService, TargetsEntry } from '../targets.service';
import { ConfigService } from '../config.service';
import { MatBottomSheet } from '@angular/material/bottom-sheet';
import { EditTargetsDialogComponent } from '../edit-targets-dialog/edit-targets-dialog.component';

@Component({
  selector: 'app-targets',
  templateUrl: './targets.component.html',
  styleUrls: ['./targets.component.scss']
})
export class TargetsComponent implements OnInit {

  public targets: TargetsEntry[] = [];
  constructor(targetService:TargetsService, public configService:ConfigService,
    private bottomSheet: MatBottomSheet,
    @Inject(LOCALE_ID) public locale: string
    ) {

    targetService.onTargetsUpdate.subscribe((e) => {

      this.targets =[...e.values()];
      this.targets.sort((a, b) => {
        if(a.tid < b.tid)
          return 1;
        return -1;
      })

    });

  }

  public edit(index): void {
    this.bottomSheet.open(EditTargetsDialogComponent, {data: this.targets[index]});
  }

  ngOnInit(): void {
  }


}
