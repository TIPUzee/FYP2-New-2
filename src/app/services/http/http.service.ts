import { Injectable } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { NotificationService } from "../../utils/components/notification/notification.service";
import { UtilsService } from "../utils/utils.service";
import { HtmlService } from "../html/html.service";

type PopupType = 'error' | 'success' | 'warning' | 'info';

interface Popup {
    type: PopupType;
    msg: string;
}

interface JsonResponse {
    data: Record<string, any> | null;
    success: boolean;
    popups: Popup[];
    reason: 'FRONTEND' | 'CLIENT' | 'SERVER' | null;
}

@Injectable({
    providedIn: 'root'
})
export class HTTPService {
    constructor(
        private cookie: CookieService,
        private notification: NotificationService,
        private utils: UtilsService,
        private htmlService: HtmlService
    ) {}
    
    
    public initAnimations({ loader }: {
        loader: HTMLDivElement | null;
    }) {
        const animations = [];
        if (loader) animations.push(this.htmlService.initFormSubmissionLoader(loader));
        return animations;
    }
    
    
    public sendRequest(
        url: string,
        jsonData: object,
        method: 'POST' | 'GET' | 'PUT' | 'DELETE',
        urlParams: Record<string, any> = {},
        headers: Record<string, any> = {},
        isOwnServerApiCall: boolean = true,
        isJsonRequest: boolean = true
    ): Promise<Record<string, any> | false> {
        return new Promise((resolve, reject) => {
            const processedUrl = this.processUrl(url, isOwnServerApiCall, urlParams);
            const xhr = this.createXhrObject(method, processedUrl, headers);
            
            xhr.onload = () => this.handleLoad(xhr, isOwnServerApiCall, resolve, reject);
            xhr.onerror = () => this.handleError(xhr, resolve, reject);
            
            if (isJsonRequest) {
                xhr.setRequestHeader('Content-Type', 'application/json');
                xhr.send(JSON.stringify(jsonData));
            } else {
                const formData = this.createFormData(jsonData);
                xhr.send(formData);
            }
        });
    }
    
    
    private createFormData(jsonData: Record<string, any>) {
        const formData = new FormData();
        for (const key in jsonData) {
            if (jsonData.hasOwnProperty(key)) {
                formData.append(key, jsonData[key]);
            }
        }
        return formData;
    }
    
    
    private createXhrObject(method: string, url: string, headers: Record<string, any>) {
        const xhr = new XMLHttpRequest();
        xhr.open(method, url, true);
        xhr.responseType = 'json';
        xhr.setRequestHeader('Authorization', this.cookie.get('Authorization'));
        Object.entries(headers).forEach(([key, value]) => xhr.setRequestHeader(key, value));
        return xhr;
    }
    
    
    private handleError(xhr: XMLHttpRequest, resolve: any, reject: any) {
        this.notification.error(
            'Network error. Please try again later!',
            'Request failed due to network error. Please try again later.'
        );
        resolve(false);
    }
    
    
    private handleErrorResponse(response: JsonResponse) {
        const { popups, desc, reason, errors }: any = response;
        if (reason === 'FRONTEND' || reason === 'SERVER') {
            errors.forEach((error: string) => this.notification.error(error, desc));
        } else {
            if (!popups) {
                return;
            }
            popups.forEach((popup: Popup) => {
                switch (popup.type) {
                    case 'success':
                        this.notification.success(popup.msg, desc);
                        break;
                    case 'warning':
                        this.notification.warning(popup.msg, desc);
                        break;
                    case 'info':
                        this.notification.info(popup.msg, desc);
                        break;
                }
            });
        }
    }
    
    
    private handleLoad(xhr: XMLHttpRequest, isOwnServerApiCall: boolean, resolve: any, reject: any) {
        if (isOwnServerApiCall && xhr.status >= 200 && xhr.status < 300) {
            resolve(xhr.response.data);
        } else {
            this.handleErrorResponse(xhr.response);
            resolve(false);
        }
    }
    
    
    private processUrl(url: string, isOwnServerApiCall: boolean, urlParams: Record<string, any>) {
        this.utils.validateApiUrl(url);
        url = isOwnServerApiCall ? this.utils.makeOwnServerUrl(this.utils.makeApiUrl(url)) : url;
        return this.utils.makeUrlQueryString(url, urlParams);
    }
}
