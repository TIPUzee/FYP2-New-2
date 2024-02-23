import { AfterViewInit, Component } from '@angular/core';
import { HtmlService } from '../../services/html/html.service';
import anime from 'animejs';
import { RouterLink } from '@angular/router';
import { FormInputComponent } from "../../utils/components/form-input/form-input.component";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators as vl } from "@angular/forms";
import { FormValidatorsService } from "../../services/form-validators/form-validators.service";

@Component({
    selector: 'app-regis-email',
    standalone: true,
    imports: [RouterLink, FormInputComponent, ReactiveFormsModule, FormsModule],
    templateUrl: './regis-email.component.html',
    styleUrl: './regis-email.component.scss',
})
export class RegisEmailComponent implements AfterViewInit {
    
    regisVerifyEmailForm = {
        fg: this._fb.group(
            {
                verificationCode: [
                    '', vl.compose([vl.required, this._fvs.numeric(), vl.minLength(6), vl.maxLength(6)])
                ],
            }
        ),
        errors: {
            verificationCode: {
                required: 'Verification Code is required',
                numeric: 'Verification Code must be only numbers',
                minlength: 'Verification Code must be 6 characters',
                maxlength: 'Verification Code must be 6 characters',
            },
        },
        waiting: false,
    }
    
    
    constructor(private htmlService: HtmlService, private _fb: FormBuilder, private _fvs: FormValidatorsService) {}
    
    
    ngAfterViewInit(): void {
        this.htmlService.initTailwindElements();
        this.htmlService.scrollToTop();
    }
    
    
    animateDropdown(): void {
        anime({
            targets: '[data-te-select-dropdown-container-ref=""]',
            translateX: [{ value: -80 }, { value: 0, duration: 700 }],
            opacity: [{ value: 0 }, { value: 1, duration: 300 }],
            easing: 'easeOutQuad',
        });
    }
    
}
