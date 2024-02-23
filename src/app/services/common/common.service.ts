import { Injectable } from '@angular/core';
import { FormBuilder } from "@angular/forms";

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    constructor(private _fb: FormBuilder) {}
    
    
    range(i: number, j: number): number[] {
        let array: number[] = [];
        for (let index = i; index < j; index++) {
            array.push(index);
        }
        return array;
    }
    
    
    getRandomNumber(min: number, max: number): number {
        const randomValue = Math.random();
        
        const scaledValue = randomValue *
            (
                max - min + 1
            ) +
            min;
        
        return Math.floor(scaledValue);
    }
}
