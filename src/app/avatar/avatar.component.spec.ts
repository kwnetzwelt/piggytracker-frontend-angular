import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AvatarComponent } from './avatar.component';
import { StringToColorPipe, StringToForegroundColorPipe } from '../stringToColor.pipe';
import { InitialsPipe } from '../initials.pipe';

describe('AvatarComponent', () => {
  let component: AvatarComponent;
  let fixture: ComponentFixture<AvatarComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [
        AvatarComponent,
        StringToColorPipe,
        StringToForegroundColorPipe,
        InitialsPipe,
      ]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AvatarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
