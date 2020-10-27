import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';


@Pipe({ name: 'remunerator' })
export class RemuneratorPipe implements PipeTransform {

  public static urlify(value: string): string {
    return value?.toLowerCase().replace(' ', '-');
  }

  getRemuneratorUrl(userId: string, fullName: string): string {
    return this.configService.staticAssets + '/uploads/' + userId + '-r-' + RemuneratorPipe.urlify(fullName);
  }

  constructor(public authService: AuthService, public configService: ConfigService) {

  }

  transform(value: string): string {
    return this.getRemuneratorUrl(this.authService.getUserProfile()?.groupId, value);
  }
}
