import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RemuneratorComponent } from './remunerator.component';

describe('RemuneratorComponent', () => {
  let component: RemuneratorComponent;
  let fixture: ComponentFixture<RemuneratorComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RemuneratorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RemuneratorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
