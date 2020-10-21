import { Component, OnInit, Inject } from '@angular/core';
import { TargetsEntry, TargetsService, Target } from '../targets.service';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { CategoriesService } from '../categories.service';
import { ConfigService } from '../config.service';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-edit-targets-dialog',
  templateUrl: './edit-targets-dialog.component.html',
  styleUrls: ['./edit-targets-dialog.component.scss']
})
export class EditTargetsDialogComponent implements OnInit {

  public targets:Target[];

  constructor(@Inject(MAT_BOTTOM_SHEET_DATA) public data: TargetsEntry,
    public categoriesService: CategoriesService,
    public configService: ConfigService,
    public apiService: ApiService,
    protected bottomSheetRef: MatBottomSheetRef<EditTargetsDialogComponent>
  ) { }

  ngOnInit(): void {

    let newTargets:Target[] = new Array<Target>();
    this.categoriesService.categories.forEach((v) => {
      // do we have a target for this category?
      if(this.data.targets.has(v))
      {
        newTargets.push(new Target(this.data.targets.get(v)));
      }else
      {
        const t:Target = new Target();
        t.name = v;
        t.tid = this.data.tid;
        newTargets.push(t);
      }

    });
    this.targets = [...newTargets];
  }

ok(): void
  {
    if(this.data._id !== undefined)
      this.apiService.putTarget(TargetsService.transformForSend(this.targets, this.data.tid,this.data._id)).subscribe((e) => {});
    else
      this.apiService.postTarget(TargetsService.transformForSend(this.targets, this.data.tid)).subscribe((e) => {});

    this.bottomSheetRef.dismiss(0);
  }

  cancel(): void
  {

    this.bottomSheetRef.dismiss(0);
  }

  getTargetValue(category: number): number
  {
    if(this.targets[category])
      return this.targets[category].targetValue;
    return 0;
  }
  updateValue(event, category: number): void {
    this.targets[category].targetValue = event.target.value;
  }
}
