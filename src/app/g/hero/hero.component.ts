import { Component, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import anime from 'animejs/lib/anime.es.js';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faHeartPulse, faKitMedical, faStethoscope } from '@fortawesome/free-solid-svg-icons';
import { HtmlService } from '../../services/html/html.service';

@Component({
    selector: 'app-hero',
    standalone: true,
    imports: [FontAwesomeModule],
    templateUrl: './hero.component.html',
    styleUrl: './hero.component.scss',
})
export class HeroComponent implements AfterViewInit {
    @ViewChild('heroComponentContainer') heroComponentContainer!: ElementRef<HTMLDivElement>;
    faHeartPulse = faHeartPulse;
    faKitMedical = faKitMedical;
    faStethoscope = faStethoscope;

    constructor(public htmlService: HtmlService) {
    }

    ngAfterViewInit(): void {
        this.animateElements();
    }

    //
    // Animations
    //
    animateElements(): void {
        let animation = () => {
            anime({
                targets: '.hero .doctor-3d',
                translateX: [
                    { value: 80, duration: 0 },
                    { value: 0, duration: 600 },
                ],
                opacity: [
                    { value: 0, duration: 0 },
                    { value: 1, duration: 400 },
                ],
                easing: 'easeOutQuad',
                delay: 200,
            });
            anime({
                targets: '.hero .content',
                translateX: [
                    { value: -80, duration: 0 },
                    { value: 0, duration: 600 },
                ],
                opacity: [
                    { value: 0, duration: 0 },
                    { value: 1, duration: 400 },
                ],
                easing: 'easeOutQuad',
                delay: 200,
            });
            anime({
                targets: '.hero .content .icons',
                translateY: [
                    { value: 80, duration: 0 },
                    { value: 0, duration: 600 },
                ],
                opacity: [
                    { value: 0, duration: 0 },
                    { value: 1, duration: 400 },
                ],
                easing: 'easeOutQuad',
                delay: anime.stagger(200, { start: 1000 }),
            });
        };

        // this.htmlService.onInView(this.heroComponentContainer.nativeElement, 400, 200, animation, true);
        animation();
    }
}
