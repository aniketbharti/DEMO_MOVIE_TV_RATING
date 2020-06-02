import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'trimLength'
})
export class TrimLengthPipe implements PipeTransform {

  transform(value: string, limit = 35, completeWords = false, ellipsis = '...') {
    if (completeWords) {
      limit = value.substr(0, limit).lastIndexOf(' ');
    }
    return value.length > limit ? value.substr(0, limit) + ellipsis : value;
  }

}
