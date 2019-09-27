import { Pipe, PipeTransform } from '@angular/core';
import { Item } from './items.service';

@Pipe({
  name: 'itemSearch'
})
export class ItemSearchPipe implements PipeTransform {

  transform(values: Item[], filterText: string): any {
    return values.filter((item: Item) => {
      if (item.name && item.name.toLowerCase().includes(filterText.toLowerCase())) {
        return true;
      }
      if (item.description && item.description.toLowerCase().includes(filterText.toLowerCase())) {
        return true;
      }
      return false;
    });
  }

}
