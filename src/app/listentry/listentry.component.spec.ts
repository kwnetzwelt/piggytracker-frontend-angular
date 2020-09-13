import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';

import { ListentryComponent } from './listentry.component';
import { RemuneratorPipe } from '../remunerator.pipe';

describe('ListentryComponent', () => {
  let component: ListentryComponent;
  let fixture: ComponentFixture<ListentryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        ListentryComponent,
        RemuneratorPipe,
      ], imports: [
        HttpClientTestingModule,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListentryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
