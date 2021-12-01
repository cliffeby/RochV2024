import { Pipe, PipeTransform, Injectable } from '@angular/core';

@Pipe({
  name: 'searchfilter',
})
@Injectable()
export class SearchFilterPipe implements PipeTransform {
  transform(items: any[], field: string, value: string): any[] {
    if (value === '') {
      return items;
    }
    if (!items) {
      return [];
    }
    const resultArray = [];
    for (const i of items) {
      if (i[field].toLowerCase().includes(value.toLowerCase())) {
        resultArray.push(i);
      }
    }
    return resultArray;
  }
}
