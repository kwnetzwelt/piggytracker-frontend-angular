import { Injectable } from '@angular/core';
import { ApiService } from './api.service';

@Injectable({
  providedIn: 'root'
})
export class ImportExportService {

  constructor(
    public apiService:ApiService,
  ) { }

  public export(): void {
    this.apiService.export().subscribe((r) => {
      const url = window.URL.createObjectURL(r);
                const link = document.createElement('a');
                link.href = url;
                link.setAttribute('download', 'export.csv');
                document.body.appendChild(link);
                link.click();
    });
  }
}
