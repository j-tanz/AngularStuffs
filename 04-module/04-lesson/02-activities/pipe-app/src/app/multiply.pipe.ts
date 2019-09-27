import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'multiply' })
export class MultiplyPipe implements PipeTransform {
  transform(value: number, numToMultiply?: number): number {
    let finalMultiplyNum;
    if (isNaN(numToMultiply)) {
      //handle case of numToMultiply not actually being a number
      finalMultiplyNum = 1;
    } else {
      //is a number, so use it
      finalMultiplyNum = numToMultiply;
    }
    return value * finalMultiplyNum;
  }
}
