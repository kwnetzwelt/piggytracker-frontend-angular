import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DOCUMENT } from '@angular/common';

import { LoginComponent } from './login.component';
import { ConfigService } from '../config.service';
import { LocationService } from '../location.service';

describe('LoginComponent', () => {
  const externalSsoUrl = 'go-to://external-sso-provider.url.from.configservice?with-params';
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async(() => {
    const locationServiceMock = jasmine.createSpyObj('LocationService', ['navigate']);
    const configServiceMock = jasmine.createSpyObj('ConfigService', ['ssoUrl']);
    configServiceMock.ssoUrl.and.returnValue(externalSsoUrl);

    TestBed.configureTestingModule({
      declarations: [LoginComponent],
      providers: [
        { provide: ConfigService, useValue: configServiceMock },
        { provide: LocationService, useValue: locationServiceMock },
      ]
    })
      .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate to external sso service', () => {
    component.startSSO();
    const spy = TestBed.inject(LocationService).navigate as jasmine.Spy;
    const navArgs = spy.calls.first().args[0];
    expect(navArgs).toBe(externalSsoUrl, 'should nav to external sso service');
  });
});
