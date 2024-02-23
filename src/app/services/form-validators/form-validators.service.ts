import { Injectable } from '@angular/core';
import { AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn } from "@angular/forms";
import { HTTPService } from "../http/http.service";

@Injectable({
    providedIn: 'root'
})
export class FormValidatorsService {
    
    constructor(private http: HTTPService) { }
    
    
    atLeastMustContainAlphaNumeric(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            
            if (!value) {
                return null;
            }
            
            if (/^(?=.*[a-zA-Z])(?=.*[0-9])/.test(value)) {
                return null;
            } else {
                return { atLeastMustContainAlphaNumeric: true };
            }
        };
    }
    
    
    atLeastOneLowercaseAndOneUppercase(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            
            if (!value) {
                return null;
            }
            
            if (/^(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
                return null;
            } else {
                return { atLeastOneLowercaseAndOneUppercase: true };
            }
        };
    }
    
    
    customRequired(ignoreValues: Array<string>): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            
            const value = control.value;
            
            if (ignoreValues.includes(value) || !value) {
                return { required: true };
            }
            
            return null;
        }
    }
    
    
    date(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            
            if (!value) {
                return null;
            }
            
            const dateFormatRegex = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
            
            if (dateFormatRegex.test(value)) {
                return null;
            } else {
                return { date: true };
            }
        };
    }
    
    
    email(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            
            if (!value) {
                return null;
            }
            
            const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
            
            if (emailRegex.test(value)) {
                return null;
            } else {
                return { email: true };
            }
        };
    }
    
    
    emailMustNotExist(): AsyncValidatorFn {
        return (control: AbstractControl): Promise<ValidationErrors | null> => {
            return new Promise(async (resolve, reject) => {
                let func = async () => {
                    let url = `/email/${ control.value }`;
                    let res = await this.http.sendRequest(url, {}, 'GET', {}, {}, true, false);
                    console.log(res);
                    if (!res) {
                        await func();
                        return;
                    }
                    if (res['exists'] == false) {
                        resolve(null);
                    } else {
                        resolve({ emailMustNotExist: true });
                    }
                }
                await func();
            })
        }
    }
    
    
    leadingSpaces(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            
            if (!value) {
                return null;
            }
            
            const trimmedValue = value.trim();
            
            if (value === trimmedValue) {
                return null;
            } else {
                return { leadingSpaces: true };
            }
        };
    }
    
    
    matchWith(matchControlName: string): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            const matchControl = control.parent?.get(matchControlName);
            const matchValue = matchControl?.value;
            
            if (value === matchValue) {
                return null;
            }
            
            let errorKey: string = matchControlName[0].toUpperCase() + matchControlName.slice(1);
            errorKey = `matchWith${ errorKey }`;
            let _: Record<string, boolean> = {};
            _[errorKey] = true;
            return _;
        };
    }
    
    
    name(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            
            if (!value) {
                return null;
            }
            
            if (/^[a-zA-Z\s]*$/.test(value)) {
                return null;
            } else {
                return { name: true };
            }
        };
    }
    
    
    noSpecialCharactersOtherThanDefinedForPassword(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            
            if (!value) {
                return null;
            }
            
            const allowedSpecialCharactersRegex = /^[A-Za-z\d@$!%*?&_-]+$/;
            
            if (allowedSpecialCharactersRegex.test(value)) {
                return null;
            } else {
                return { noSpecialCharactersOtherThanDefinedForPassword: true };
            }
        };
    }
    
    
    numeric(): ValidatorFn {
        return (control: AbstractControl): ValidationErrors | null => {
            const value = control.value;
            
            if (!value) {
                return null;
            }
            
            if (/^\d+$/.test(value)) {
                return null;
            } else {
                return { numeric: true };
            }
        };
    }
}
