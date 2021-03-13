import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { RankingEntrySettingsDialogComponent } from './ranking-entry-settings-dialog.component';

describe('RankingEntrySettingsDialogComponent', () => {
  let component: RankingEntrySettingsDialogComponent;
  let fixture: ComponentFixture<RankingEntrySettingsDialogComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ RankingEntrySettingsDialogComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RankingEntrySettingsDialogComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
