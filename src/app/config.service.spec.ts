import { TestBed } from '@angular/core/testing';

import { ConfigService } from './config.service';
import { ExpectedConditions } from 'protractor';

describe('ConfigService', () => {
  let service: ConfigService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ConfigService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should build sso url', () => {
    service.initWithValues({
      googleClientId: '483535558510-vhcru5umuiitnjiknlnc8g62s4v6p876.apps.googleusercontent.com',
      baseUrl: 'http://localhost:4000',
      apiEndpoint: '/api/v1',
      staticAssets: 'http://localhost:4000/static',
      locale: 'de-DE',
      currency: 'EUR',
      externalSsoUrl: 'https://hostname.tld/auth/openid-connect',
      externalSsoClientId: 'testclient',
      externalSsoRedirectUri: 'http://localhost:3000/testlogin'
    } as unknown as ConfigService
    );

    const urlparts = service.ssoUrl().split('?');

    const queryparams = {};
    urlparts[1].split('&').forEach(q => {
      const p = q.split('=', 2);
      queryparams[p[0]] = p[1];
    });

    expect(urlparts[0]).toBe('https://hostname.tld/auth/openid-connect');
    expect(queryparams['response_type']).toBe('token');
    expect(queryparams['client_id']).toBe('testclient');
    expect(queryparams['redirect_uri']).toBe('http%3A%2F%2Flocalhost%3A3000%2Ftestlogin');
    expect(queryparams['scope']).toBe('email%20profile');
  });
});
