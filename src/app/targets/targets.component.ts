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
  constructor(public targetService:TargetsService, public configService:ConfigService,
    private bottomSheet: MatBottomSheet,
    @Inject(LOCALE_ID) public locale: string
    ) {

    targetService.onTargetsUpdate.subscribe((e) => {

      this.targets =[...e.values()];
      this.targets = this.targets.filter((e) => {
        return !e.isInFuture;
      });
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

  public editNext(): void {
    const date:Date = new Date();
    const tid:number = date.getUTCFullYear() * 12 + date.getUTCMonth() + 1;
    // let us check with the targetsService if we already have targets for next month
    if(this.targetService.targets.has(tid))
    {
      this.bottomSheet.open(EditTargetsDialogComponent, {data: this.targetService.targets.get(tid)});
    }else
    {
      this.bottomSheet.open(EditTargetsDialogComponent, {data: new TargetsEntry(tid)});
    }
  }

  ngOnInit(): void {
  }


}
