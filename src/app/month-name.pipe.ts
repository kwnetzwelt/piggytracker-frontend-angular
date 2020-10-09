import { Pipe, PipeTransform } from '@angular/core';
import { ConfigService } from './config.service';

@Pipe({
  name: 'monthName'
})
export class MonthNamePipe implements PipeTransform {

  constructor( public configService: ConfigService) {

  }

  transform(value: Date): string {
    return value.toLocaleDateString(this.configService.locale, this.configService.dateTimeFormatMonthName);
  }

}
