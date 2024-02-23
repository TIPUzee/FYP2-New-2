import { AfterViewInit, Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormGroupDirective, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { HtmlService } from "../../../services/html/html.service";
import { NgClass, NgForOf, NgIf } from "@angular/common";
import { expandCollapseAnimation } from "../../../services/animations/animations";
import { FontAwesomeModule } from "@fortawesome/angular-fontawesome";
import { faEye as faEyeSolid } from "@fortawesome/free-solid-svg-icons";
import { faEye as faEyeRegular } from "@fortawesome/free-regular-svg-icons";

@Component({
    selector: 'form-input',
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        NgClass,
        NgIf,
        NgForOf,
        FontAwesomeModule,
    ],
    templateUrl: './form-input.component.html',
    styleUrl: './form-input.component.scss',
    animations: [expandCollapseAnimation],
})
export class FormInputComponent implements AfterViewInit, OnInit {
    faEyeSolidIcon = faEyeSolid;
    faEyeRegularIcon = faEyeRegular;
    
    @Input({ required: true }) label: string = '';
    @Input({ required: true }) type: string = 'text';
    @Input({ required: false }) placeholder: string = ' ';
    @Input({ required: false }) disabled: boolean = false;
    @Input({ required: false }) helperText: string = '';
    @Input({ required: false }) allowOnlyNumbers: boolean = false;
    
    @Input({ required: true }) controlName: string = '';
    @Input({ required: true }) errors!: Record<any, string>;
    
    @Input({ required: false }) inputEleClasses: string = '';
    
    formGroup!: FormGroup;
    currentError: string = '';
    
    
    constructor(private rootFormGroup: FormGroupDirective, private htmlService: HtmlService) {
    }
    
    
    ngOnInit() {
        this.formGroup = this.rootFormGroup.control;
    }
    
    
    ngAfterViewInit() {
        this.htmlService.initTailwindElements();
    }
    
    
    removeCharactersOtherThanNumbers(): void {
        let value = this.formGroup.get(this.controlName)?.value;
        if (value) {
            this.formGroup.get(this.controlName)?.setValue(value.replace(/[^0-9]/g, ''));
        }
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
