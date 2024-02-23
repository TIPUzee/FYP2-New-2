import { AfterViewInit, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective, ReactiveFormsModule } from "@angular/forms";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { HtmlService } from "../../../services/html/html.service";

export interface FormSelectOption {
    value: string;
    label: string;
    isDisabled?: boolean;
    isSelected?: boolean;
    isHidden?: boolean;
}

@Component({
    selector: 'form-select',
    standalone: true,
    imports: [
        ReactiveFormsModule,
        NgForOf,
        NgIf,
        NgClass
    ],
    templateUrl: './form-select.component.html',
    styleUrl: './form-select.component.scss'
})
export class FormSelectComponent implements AfterViewInit, OnInit {
    @Input({ required: true })
    label: string = '';
    
    @Input({ required: false })
    placeholder: string = ' ';
    
    @Input({ required: false })
    disabled: boolean = false;
    
    @Input({ required: true })
    options: Array<FormSelectOption> = [];
    
    @Input({ required: true }) controlName: string = '';
    @Input({ required: true }) errors!: Record<any, string>;
    
    formGroup!: FormGroup;
    
    @ViewChild('selectEle')
    selectEle!: ElementRef<HTMLSelectElement>;
    
    currentError: string = '';
    
    
    constructor(private rootFormGroup: FormGroupDirective, private htmlService: HtmlService) {
    }
    
    
    ngOnInit() {
        this.formGroup = this.rootFormGroup.control;
    }
    
    
    ngAfterViewInit() {
        this.htmlService.initTailwindElements();
        this.initTwSelect();
    }
    
    
    initTwSelect(): void {
        this.selectEle.nativeElement?.addEventListener('close.te.select', (e) => {
            this.formGroup.get(this.controlName)?.markAsTouched();
        })
    }
    
    
    updateError(): false {
        this.currentError = '';
        for (let [errorName, errorDesc] of Object.entries(this.errors)) {
            if (this.formGroup.get(this.controlName)?.touched &&
                this.formGroup.get(this.controlName)?.hasError(errorName)
            ) {
                this.currentError = errorDesc;
                return false;
            }
        }
        return false;
    }
}
