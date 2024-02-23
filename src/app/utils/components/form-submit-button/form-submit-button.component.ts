import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { NgClass } from "@angular/common";

@Component({
    selector: 'form-submit-button',
    standalone: true,
    imports: [
        NgClass
    ],
    templateUrl: './form-submit-button.component.html',
    styleUrl: './form-submit-button.component.scss'
})
export class FormSubmitButtonComponent implements OnInit {
    @Input({ required: true }) label: string = '';
    @Input({ required: false }) type: string = 'submit';
    @Input({ required: false }) waiting: boolean = false;
    @Input({ required: false }) disabled: boolean = false;
    @Input({ required: false }) disableOnStart: boolean = false;
    
    @ViewChild('loader') loader!: HTMLDivElement;
    
    
    constructor() {
    }
    
    
    ngOnInit() {
        this.disabled = this.disableOnStart;
    }
}
