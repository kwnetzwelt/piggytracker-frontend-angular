import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { UsergroupComponent } from './usergroup.component';

describe('UsergroupComponent', () => {
  let component: UsergroupComponent;
  let fixture: ComponentFixture<UsergroupComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ UsergroupComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UsergroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
