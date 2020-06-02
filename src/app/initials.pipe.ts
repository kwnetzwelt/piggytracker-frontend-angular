import { Pipe, PipeTransform } from '@angular/core';
import { AuthService } from './auth.service';
import { ConfigService } from './config.service';
import { config } from 'rxjs';


@Pipe({ name: 'initials' })
export class InitialsPipe implements PipeTransform {


  transform(value: string): string{

    var initials = value.split(' ');
    if(initials.length >= 2)
      return initials[0].charAt(0).toUpperCase() + initials[initials.length-1].charAt(0).toUpperCase();
    else
      return value.charAt(0).toUpperCase();
  }
}
