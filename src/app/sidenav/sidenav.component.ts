import { Component, OnInit, ElementRef } from '@angular/core';
import { CategoriesService } from '../categories.service';
import { RemuneratorsService } from '../remunerators.service';

import { ViewChild } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(public categoriesService:CategoriesService,public apiService:ApiService, public remuneratorsService:RemuneratorsService) { }

  ngOnInit(): void {
  }


  refresh(): void {
    window.location.reload();
  }

  public OpenAddFilesDialog( element:ElementRef) {
    const e: HTMLElement = element.nativeElement;
    e.click();
  }

  @ViewChild('UploadCategoryImage') UploadCategoryImage: ElementRef;
  selectedCategory: string;
  uploadCategoryImage(name: string): void {
    console.log(name);
    this.selectedCategory = name;
    this.OpenAddFilesDialog(this.UploadCategoryImage);
  }
  public onUploadCategoryImageChange(inputElement: any)
  {
    const file: File = inputElement.files[0];
    // uploadfile
    this.apiService.uploadCategoryImage(file, this.selectedCategory).subscribe(e => {
      console.log(e);
    });
  }



  @ViewChild('UploadRemuneratorImage') UploadRemuneratorImage: ElementRef;
  selectedRemunerator: string;
  uploadRemuneratorImage(name: string): void {
    console.log(name);
    this.selectedRemunerator = name;
    this.OpenAddFilesDialog(this.UploadRemuneratorImage);
  }

  public onUploadRemuneratorImageChange(inputElement: any)
  {
    const file: File = inputElement.files[0];
    // uploadfile
    this.apiService.uploadRemuneratorImage(file, this.selectedRemunerator).subscribe(e => {
      console.log(e);
    });
  }

}
