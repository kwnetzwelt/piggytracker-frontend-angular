import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { WastrelsComponent } from './wastrels.component';

describe('WastrelsComponent', () => {
  let component: WastrelsComponent;
  let fixture: ComponentFixture<WastrelsComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ WastrelsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WastrelsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
