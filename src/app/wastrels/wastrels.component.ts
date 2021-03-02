import { Component, OnInit } from '@angular/core';
import { RankingService, RankingEntry } from '../ranking.service';
import { ConfigService } from '../config.service';
import { MatDialog } from '@angular/material/dialog';
import { RankingEntrySettingsDialogComponent } from '../ranking-entry-settings-dialog/ranking-entry-settings-dialog.component';


@Component({
  selector: 'app-wastrels',
  templateUrl: './wastrels.component.html',
  styleUrls: ['./wastrels.component.scss']
})
export class WastrelsComponent implements OnInit {

  constructor(public dialog: MatDialog, public rankingService: RankingService, public configService: ConfigService) { }

  displayedColumns: string[] = ['avatar','name','spending','total','delta','menu'];
  ngOnInit(): void {
  }

  openRankingEntrySettingsDialog(element: RankingEntry): void {
    const dialogRef = this.dialog.open(RankingEntrySettingsDialogComponent, {
      //width: '250px',
      data: element
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      //this.animal = result;
    });
  }

}
