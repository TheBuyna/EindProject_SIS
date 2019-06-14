import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'truncateText'
})
export class TruncateTextPipe implements PipeTransform {

  transform(value: string, length: number): any {
    //https://en.wikipedia.org/wiki/Longest_word_in_English
    const biggestWord = 50;
    const elipses = "...";


    if (typeof value === 'undefined') {
      return;
    }
    if (value != null) {
      if (value.length <= length) {
        return value;
      }
    } else {
      return;
    }

    //.. truncate to about correct lenght
    let truncatedText;
    if (value != null) {
      truncatedText = value.slice(0, length + biggestWord);
    }

    //.. now nibble ends till correct length
    if (truncatedText != null) {
      while (truncatedText.length > length - elipses.length) {
          let lastSpace = truncatedText.lastIndexOf(" ");

          if (lastSpace === -1) {
             break;
            }

          truncatedText = truncatedText.slice(0, lastSpace).replace(/[!,.?]$/, '');

      };
    }

    return truncatedText + elipses;
  }

}
