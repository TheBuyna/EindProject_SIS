import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'stringFilter'
})
export class StringFilterPipe implements PipeTransform {

  // search articles by string filter
  transform(value: string[][], q: string) {
    if (!q || q === '') {
        return value;
    }
    return value.filter(
      item =>
      -1 < item['title'].toLowerCase().indexOf(q.toLowerCase()) ||
      -1 < item['description'].toLowerCase().indexOf(q.toLowerCase()) ||
      -1 < item['addedAt']['date'].toLowerCase().indexOf(q.toLowerCase())
      );
}
}
