import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditTargetsDialogComponent } from './edit-targets-dialog.component';

describe('EditTargetsDialogComponent', () => {
  let component: EditTargetsDialogComponent;
  let fixture: ComponentFixture<EditTargetsDialogComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditTargetsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditTargetsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
