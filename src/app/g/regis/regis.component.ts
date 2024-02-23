import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HtmlService } from '../../services/html/html.service';
import { Router, RouterLink } from '@angular/router';
import { UtilsService } from "../../services/utils/utils.service";
import { HTTPService } from "../../services/http/http.service";
import { CookieService } from "ngx-cookie-service";
import { NgOptimizedImage } from "@angular/common";
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators as vl } from '@angular/forms';
import { FormInputComponent } from "../../utils/components/form-input/form-input.component";
import { FormSelectComponent, FormSelectOption } from "../../utils/components/form-select/form-select.component";
import { FormValidatorsService } from "../../services/form-validators/form-validators.service";
import { FormDatePickerComponent } from "../../utils/components/form-date-picker/form-date-picker.component";
import { FormSubmitButtonComponent } from "../../utils/components/form-submit-button/form-submit-button.component";

@Component({
    selector: 'app-regis',
    standalone: true,
    imports: [
        RouterLink, NgOptimizedImage, ReactiveFormsModule, FormInputComponent, FormSelectComponent,
        FormDatePickerComponent, FormSubmitButtonComponent, FormsModule
    ],
    templateUrl: './regis.component.html',
    styleUrl: './regis.component.scss',
})
export class RegisComponent implements AfterViewInit {
    @ViewChild('dobInput') dobInput!: ElementRef<HTMLDivElement>;
    
    userTypeOptions: Array<FormSelectOption> = [
        { value: '-', label: 'Select User Type', isDisabled: true },
        { value: 'p', label: 'Patient' },
        { value: 'd', label: 'Doctor' },
    ];
    
    regisForm = {
        fg: this._fb.group({
            userType: ['', this._fvs.customRequired(['-'])],
            name: [
                '', vl.compose([
                    vl.required, this._fvs.leadingSpaces(), this._fvs.name(), vl.minLength(3), vl.maxLength(32)
                ])
            ],
            dob: ['', vl.compose([vl.required, this._fvs.date()])],
            whatsappNumber: ['', vl.compose([vl.required, vl.minLength(10), vl.maxLength(15)])],
            email: ['', vl.compose([vl.required, this._fvs.email()]), vl.composeAsync([this._fvs.emailMustNotExist()])],
            password: [
                '',
                vl.compose([
                    vl.required, vl.minLength(8), vl.maxLength(32), this._fvs.atLeastMustContainAlphaNumeric(),
                    this._fvs.atLeastOneLowercaseAndOneUppercase(),
                    this._fvs.noSpecialCharactersOtherThanDefinedForPassword()
                ])
            ],
            confirmPassword: ['', vl.compose([vl.required, this._fvs.matchWith('password')])],
            agreement: [false, vl.requiredTrue],
        }),
        errors: {
            userType: {
                required: 'User Type is required',
            },
            name: {
                required: 'Name is required',
                leadingSpaces: 'Name cannot start or end with spaces',
                name: 'Name must contain only alphabets and spaces',
                minlength: 'Name must be at least 3 characters long',
                maxlength: 'Name must be at most 32 characters long',
            },
            dob: {
                required: 'Date of Birth is required',
                date: 'Invalid date format. Please use the date picker to select a date.',
            },
            whatsappNumber: {
                required: 'Whatsapp Number is required',
                minlength: 'Whatsapp Number must be at least 10 characters long',
                maxlength: 'Whatsapp Number must be at most 15 characters long',
            },
            email: {
                required: 'Email is required',
                email: 'Invalid email format',
                emailMustNotExist: 'Email has already taken',
            },
            password: {
                required: 'Password is required',
                minlength: 'Password must be at least 8 characters long',
                maxlength: 'Password must be at most 32 characters long',
                atLeastMustContainAlphaNumeric: 'Password must contain at least 1 alphabet and 1 number',
                atLeastOneLowercaseAndOneUppercase: 'Password must contain at least 1 lowercase and 1 uppercase alphabet',
                noSpecialCharactersOtherThanDefinedForPassword: 'Password must not contain any special characters other than !, @, $, %, &, *, _ and _',
            },
            confirmPassword: {
                required: 'Confirm Password is required',
                matchWithPassword: 'Passwords do not match',
            },
        },
        waiting: false,
        agreementChecked: false,
    }
    
    
    constructor(
        private htmlService: HtmlService,
        private http: HTTPService,
        private utils: UtilsService,
        private cookie: CookieService,
        private _fb: FormBuilder,
        private _fvs: FormValidatorsService,
        private router: Router
    ) {
        // initTE({ Input, Ripple });
    }
    
    
    ngAfterViewInit(): void {
        this.htmlService.initTailwindElements();
        this.htmlService.scrollToTop();
    }
    
    
    async onRegistration(event: Event,): Promise<void> {
        event.preventDefault();
        this.utils.markAllFormControlsAsTouched(this.regisForm.fg);
        if (this.regisForm.fg.invalid) {
            return;
        }
        this.regisForm.waiting = true;
        let formData: Record<string, any> = this.regisForm.fg.value;
        formData = this.utils.transformJsonCamelCaseToSnakeCase(formData);
        
        let res = await this.http.sendRequest(
            '/auth', formData, 'POST', {}, {}, true, true
        );
        this.regisForm.waiting = false;
        if (!res) {
            return;
        }
        res = this.utils.transformJsonSnakeCaseToCamelCase(res);
        this.cookie.set('Authorization', res['token']);
        this.utils.setCurrentUser(res['userType']);
        await this.router.navigate(['regis', 'mail']);
    }
}
