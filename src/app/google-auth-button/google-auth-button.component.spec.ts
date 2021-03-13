import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { GoogleAuthButtonComponent } from './google-auth-button.component';

describe('GoogleAuthButtonComponent', () => {
  let component: GoogleAuthButtonComponent;
  let fixture: ComponentFixture<GoogleAuthButtonComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ GoogleAuthButtonComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GoogleAuthButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
