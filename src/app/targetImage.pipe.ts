import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { config } from 'rxjs';

@Pipe({ name: 'targetImage' })
export class TargetImagePipe implements PipeTransform {

  getUrl (month: number): string {

    return this.configService.staticAssets + "/month/" + month.toString().padStart(2,"0") + ".jpg";
  }

  constructor(public authService: AuthService, public configService: ConfigService) {

  }

  transform(value: number): string{
    return this.getUrl(value);
  }
}
