import { Injectable } from '@angular/core';
import { EntriesService } from './entries.service';
import { TargetsService } from './targets.service';

@Injectable({
  providedIn: 'root'
})
export class RemuneratorsService {

  public remunerators:string[];

  constructor(
    public entriesService:EntriesService
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

    this.update();
  }

  update(): void
  {
    this.remunerators = [...this.entriesService.remunerators];
  }
}
