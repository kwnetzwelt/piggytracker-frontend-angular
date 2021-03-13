import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { ImportExportDialogComponent } from './import-export-dialog.component';

describe('ImportExportDialogComponent', () => {
  let component: ImportExportDialogComponent;
  let fixture: ComponentFixture<ImportExportDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ ImportExportDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ImportExportDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
