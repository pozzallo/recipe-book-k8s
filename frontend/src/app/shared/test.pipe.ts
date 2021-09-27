import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'test'
})
export class TestPipe implements PipeTransform{

    transform(value: any, ...args: any[]) {
        throw new Error('Method not implemented.');
    }
    
}