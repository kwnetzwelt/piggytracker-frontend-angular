import { Injectable, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class LocationService {

  constructor(@Inject(DOCUMENT) private document: Document) { }

  public navigate(url: string) {
    this.document.location.href = url;
  }
}
