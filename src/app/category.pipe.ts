import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { config } from 'rxjs';


@Pipe({ name: 'category' })
export class CategoryPipe implements PipeTransform {

  public static urlify (value: string): string {
    return value.toLowerCase().replace(" ","-");
  }

  getCategoryUrl (userId: string, fullName: string): string {
    return this.configService.staticAssets + "/uploads/" + userId + "-c-" + CategoryPipe.urlify(fullName);
  }

  constructor(public authService: AuthService, public configService: ConfigService) {

  }

  transform(value: string): string{
    return this.getCategoryUrl(this.authService.getUserProfile().groupId, value);
  }
}
