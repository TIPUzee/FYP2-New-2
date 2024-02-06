import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HtmlService } from '../../services/html/html.service';
import anime from 'animejs';
import { Datepicker } from 'tw-elements';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-reset-new-pass',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './reset-new-pass.component.html',
    styleUrl: './reset-new-pass.component.scss',
})
export class ResetNewPassComponent implements AfterViewInit {
    constructor(private htmlService: HtmlService) {
        // initTE({ Input, Ripple });
    }

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
