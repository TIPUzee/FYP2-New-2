import { ElementRef, Injectable } from '@angular/core';
import { env } from '../../../env/env';
import { FormGroup } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";

@Injectable({
    providedIn: 'root',
})
export class UtilsService {
    // Current User Type
    private currentUser: 'g' | 'p' | 'd' | 'a' = 'g';
    
    
    constructor(private cookie: CookieService) {}
    
    
    convertFormDataToJson(formData: FormData): Record<string, any> {
        const jsonData: Record<string, any> = {};
        
        formData.forEach((value, key) => {
            jsonData[key] = value;
        });
        
        return jsonData;
    }
    
    
    getCurrentUser(): 'g' | 'p' | 'd' | 'a' {
        return this.currentUser;
    }
    
    
    getFormData(form: ElementRef<HTMLFormElement> | HTMLFormElement, asJson: boolean = false): Record<string, any> {
        if (form instanceof ElementRef) {
            form = form.nativeElement;
        }
        let formData = new FormData(form);
        if (asJson) {
            return this.convertFormDataToJson(formData);
        }
        return formData;
    }
    
    
    makeApiUrl(url: string): string {
        return '/api' + url;
    }
    
    
    makeOwnServerUrl(url: string): string {
        return env.serverURL + url;
    }
    
    
    makeUrlQueryString(url: string, urlParams: Record<string, any>): string {
        const queryString = Object.entries(urlParams)
            .map(([key, value]) => `${ key }=${ value }`).join('&');
        if (queryString) {
            url += `?${ queryString }`;
        }
        return url;
    }
    
    
    markAllFormControlsAsTouched(form: FormGroup): void {
        Object.keys(form.controls).forEach(controlName => {
            form.get(controlName)?.markAsTouched();
        });
    }
    
    
    setCurrentUser(userType: 'g' | 'p' | 'd' | 'a'): void {
        this.currentUser = userType;
        this.cookie.set('userType', userType);
    }
    
    
    transformJsonCamelCaseToSnakeCase(json: Record<string, any>): Record<string, any> {
        const transformedJson: Record<string, any> = {};
        
        Object.entries(json).forEach(([key, value]) => {
            const newKey = key.replace(/([A-Z])/g, '_$1').toLowerCase();
            transformedJson[newKey] = value;
        });
        
        return transformedJson;
    }
    
    
    transformJsonSnakeCaseToCamelCase(json: Record<string, any>): Record<string, any> {
        const transformedJson: Record<string, any> = {};
        
        Object.entries(json).forEach(([key, value]) => {
            const newKey = key.replace(/_([a-z])/g, (match, letter) => letter.toUpperCase());
            transformedJson[newKey] = value;
        });
        
        return transformedJson;
    }
    
    
    validateApiUrl(url: string): void {
        if (url[0] !== '/') {
            throw new Error('API url must start with /');
        }
    }
}
