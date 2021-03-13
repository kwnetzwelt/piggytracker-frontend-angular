import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { EditEntryDialogComponent } from './edit-entry-dialog.component';

describe('EditEntryDialogComponent', () => {
  let component: EditEntryDialogComponent;
  let fixture: ComponentFixture<EditEntryDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ EditEntryDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditEntryDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
