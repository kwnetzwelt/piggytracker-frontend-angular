import { Component, OnInit, Inject } from '@angular/core';
import { RankingEntry } from '../ranking.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { ApiService, RemuneratorEntry } from '../api.service';
import { UpdateService } from '../update.service';

@Component({
  selector: 'app-ranking-entry-settings-dialog',
  templateUrl: './ranking-entry-settings-dialog.component.html',
  styleUrls: ['./ranking-entry-settings-dialog.component.scss']
})
export class RankingEntrySettingsDialogComponent implements OnInit {


  constructor(@Inject(MAT_DIALOG_DATA) public data: RankingEntry, public dialogRef: MatDialogRef<RankingEntrySettingsDialogComponent>, public apiService: ApiService, public updateService: UpdateService) {
    this.dialogRef.afterClosed().subscribe((e) => {
      this.updateService.start();
    })
   }
   save(): void {
     const entry = {name: this.data.name, offset: parseFloat(this.data.offset.toString())} as RemuneratorEntry;
    this.apiService.postRemunerator(entry).subscribe((e) => {
      this.dialogRef.close();
    });
  }
  ngOnInit(): void {
    this.updateService.stop();
  }

}
