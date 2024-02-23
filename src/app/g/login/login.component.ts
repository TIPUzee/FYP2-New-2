import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HtmlService } from '../../services/html/html.service';
import anime from 'animejs';
import { Router, RouterLink } from '@angular/router';
import { ApiFormSubmitterDirective } from "../../directives/api-form-submitter/api-form-submitter.directive";

@Component({
    selector: 'app-login',
    standalone: true,
    imports: [RouterLink, ApiFormSubmitterDirective],
    templateUrl: './login.component.html',
    styleUrl: './login.component.scss',
})
export class LoginComponent implements AfterViewInit {
    @ViewChild('userTypeSelectorInput') userTypeSelectorInput!: ElementRef<HTMLSelectElement>;
    
    
    constructor(
        private htmlService: HtmlService,
        public router: Router,
    ) {
    }
    
    
    ngAfterViewInit(): void {
        this.htmlService.scrollToTop();
        this.htmlService.initTailwindElements();
    }
    
    
    animateDropdown(): void {
        anime({
            targets: '[data-te-select-dropdown-container-ref=""]',
            translateX: [{ value: -80 }, { value: 0, duration: 700 }],
            opacity: [{ value: 0 }, { value: 1, duration: 300 }],
            easing: 'easeOutQuad',
        });
    }
    
    
    async onLogin(event: Event) {
        event.preventDefault();
    }
}
