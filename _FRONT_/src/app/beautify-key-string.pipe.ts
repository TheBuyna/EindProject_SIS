import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'beautifyKeyString'
})
export class BeautifyKeyStringPipe implements PipeTransform {

  // Beautify text
  transform(inputString: any): any {
    if (!inputString) {
      return inputString;
    }
    return inputString[0].toUpperCase() + inputString.substr(1).toLowerCase().split('_').join(' ');
  }

}
