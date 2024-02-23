import { Directive, ElementRef, HostListener } from '@angular/core';
import { HTTPService } from "../../services/http/http.service";
import { UtilsService } from "../../services/utils/utils.service";
import { CookieService } from "ngx-cookie-service";

@Directive({
    selector: '[appApiFormSubmitter]',
    standalone: true
})
export class ApiFormSubmitterDirective {
    
    constructor(
        private el: ElementRef,
        private http: HTTPService,
        private utils: UtilsService,
        private cookie: CookieService
    ) {
    }
    
    
    @HostListener('submit', ['$event'])
    async onSubmit(event: Event) {
        event.preventDefault();
        let url = this.el.nativeElement.getAttribute('action');
        let formData = new FormData(this.el.nativeElement);
        
        let res;
        if (this.el.nativeElement.getAttribute('enctype') !== 'multipart/form-data') {
            
            let jsonData = this.utils.convertFormDataToJson(formData);
            res = await this.http.sendRequest(url, jsonData, 'POST');
            
        } else {
            res = await this.http.sendRequest(url, formData, 'POST');
        }
        
        if (!res) {
            return;
        }
        this.cookie.set('Authorization', res['token']);
    }
}
