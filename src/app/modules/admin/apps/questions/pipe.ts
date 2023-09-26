
import { Pipe, PipeTransform } from '@angular/core';
import moment from 'moment';

@Pipe({name: 'datepipe'})
export class datepipe implements PipeTransform{
  
    transform(value:any, args:any){
     
        return moment(value,'HH:mm').format("hh:mm A");

    }

}