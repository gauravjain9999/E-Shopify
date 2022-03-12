import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterSearch',
})
export class FilterSearchPipe implements PipeTransform {
  transform(value: any, searchText: any) {
    if (value.length === 0) {
      return value;
    }

    const users = [];
    for (const user of value) {
      if (user['brand'] === searchText) {
        users.push(user);
      }
    }
    return users;
  }
}
