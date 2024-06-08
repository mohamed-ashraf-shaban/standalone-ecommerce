import { Pipe, PipeTransform } from '@angular/core';
import { Products } from '../interfaces/products';

@Pipe({
  name: 'search',
  standalone: true
})
export class SearchPipe implements PipeTransform {

  transform(products:Products[],term:string): Products[] {

    return products.filter( (item)=> item.title.toLocaleLowerCase().includes(term.toLocaleLowerCase()) );
  }

}
