import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
    name: 'ratio'
})
export class RatioPipe implements PipeTransform {

    // transform(value: string): string {
      
    // return parseFloat(value).toFixed(0);
    // }
    transform(value: string, exponent: string): string {
        let exp = parseFloat(exponent);
    return parseFloat(value).toFixed(isNaN(exp) ? 0 : exp);
    }

}