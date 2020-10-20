import { Injectable } from '@angular/core';
import { EntriesService } from './entries.service';
import { TargetsService } from './targets.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  public categories: string[];

  constructor(
    public entriesService:EntriesService,
    public targetsService:TargetsService
  ) {
    entriesService.onEntryAdded.subscribe((e) => {
      this.update();
    });
    entriesService.onEntryChanged.subscribe((e) => {
      this.update();
    });
    entriesService.onEntryRemoved.subscribe((e) => {
      this.update();
    });

    targetsService.onTargetsUpdate.subscribe((e) => {
      this.update();
    });

    this.update();
   }

  update(): void
  {
    this.categories = [...this.entriesService.categories, ...this.targetsService.categories];
    this.categories = this.categories.filter((v) => v.length > 0);
    let uniqueEntries = [];
    this.categories.forEach((v) => {
      if(uniqueEntries.indexOf(v) === -1)
        uniqueEntries.push(v);
    })
    this.categories = [...uniqueEntries];
  }
}
