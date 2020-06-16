import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filter'
})
export class FilterPipe implements PipeTransform {
  transform(books: any[], searchText: string): any {
    searchText = searchText.toLowerCase();
    if (!books) {
      return null;
    }
    else if(searchText==""){
      return books;
    }
    else {
    //   books.filter(function(item){
    //     return JSON.stringify(item.bookName).toLowerCase().includes(searchText);
    // });
      return books.filter(book => book.bookName.toLowerCase().indexOf(searchText) !== -1)
    }
  }

}
