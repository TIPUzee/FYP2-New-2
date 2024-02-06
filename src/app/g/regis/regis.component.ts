import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import { HtmlService } from '../../services/html/html.service';
import anime from 'animejs';
import { Datepicker } from 'tw-elements';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-regis',
    standalone: true,
    imports: [RouterLink],
    templateUrl: './regis.component.html',
    styleUrl: './regis.component.scss',
})
export class RegisComponent implements AfterViewInit {
    @ViewChild('dobInput') dobInput!: ElementRef<HTMLDivElement>;

    constructor(private htmlService: HtmlService) {
        // initTE({ Input, Ripple });
    }

    ngAfterViewInit(): void {
        this.htmlService.initTailwindElements();
        this.htmlService.scrollToTop();
        this.initDOBPicker();
    }

    initDOBPicker(): void {
        new Datepicker(this.dobInput.nativeElement, {
            max: new Date(2007, 5, 20),
            disableFuture: true,
            confirmDateOnSelect: true,
        });
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
