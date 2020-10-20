import { Component, OnInit, Inject } from '@angular/core';
import { ApiService } from '../api.service';
import { MAT_BOTTOM_SHEET_DATA, MatBottomSheetRef } from '@angular/material/bottom-sheet';
import { ImportExportService } from '../import-export.service';

@Component({
  selector: 'app-import-export-dialog',
  templateUrl: './import-export-dialog.component.html',
  styleUrls: ['./import-export-dialog.component.scss']
})
export class ImportExportDialogComponent implements OnInit {

  constructor(
     public importExportService: ImportExportService,
     protected bottomSheetRef: MatBottomSheetRef<ImportExportDialogComponent>
  ) { }

  ngOnInit(): void {
  }
  handleExportClicked(): void {
    this.importExportService.export();
  }
  close(): void {
    this.bottomSheetRef.dismiss(0);
  }
}
