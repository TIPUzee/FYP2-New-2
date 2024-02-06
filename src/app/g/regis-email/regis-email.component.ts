import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HtmlService } from '../../services/html/html.service';
import anime from 'animejs';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-regis-email',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './regis-email.component.html',
    styleUrl: './regis-email.component.scss',
})
export class RegisEmailComponent implements AfterViewInit {
    constructor(private htmlService: HtmlService) {}

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
