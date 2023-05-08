import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
name : 'trim'
})
export class TrimPipe implements PipeTransform {

  transform(str: any,args?: any): any{
    const data = str.replace(/ /g , '')
    return data;
  }

}
