import { Injectable } from '@angular/core';
import { Observable, range } from 'rxjs';

@Injectable({
    providedIn: 'root',
})
export class CommonService {
    constructor() {}

    range(i: number, j: number): number[] {
        let array: number[] = [];
        for (let index = i; index < j; index++) {
            array.push(index);
        }
        return array;
    }

    getRandomNumber(min: number, max: number): number {
        const randomValue = Math.random();

        const scaledValue = randomValue * (max - min + 1) + min;

        return Math.floor(scaledValue);
    }
}
