import { Component, ElementRef, ViewChild } from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faMapLocationDot, faPhone, faEnvelope, faClock } from '@fortawesome/free-solid-svg-icons';
import { faWhatsappSquare, faFacebookF, faTwitter, faInstagram, faLinkedinIn } from '@fortawesome/free-brands-svg-icons';
import anime from 'animejs/lib/anime.es.js';
import { HtmlService } from '../../services/html/html.service';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-footer',
    standalone: true,
    imports: [FontAwesomeModule, RouterLink],
    templateUrl: './footer.component.html',
    styleUrl: './footer.component.scss',
})
export class FooterComponent {
    faMapLocationDot = faMapLocationDot;
    faWhatsappSquare = faWhatsappSquare;
    faPhone = faPhone;
    faEnvelope = faEnvelope;
    faClock = faClock;
    faFacebookF = faFacebookF;
    faTwitter = faTwitter;
    faInstagram = faInstagram;
    faLinkedinIn = faLinkedinIn;

    @ViewChild('footer') footer!: ElementRef<HTMLDivElement>;

    constructor(public htmlService: HtmlService) {}

    ngAfterViewInit(): void {
        this.animateElements();
    }

    animateElements(): void {
        this.htmlService.onInView(
            this.footer.nativeElement,
            25,
            25,
            () => {
                anime({
                    targets: '.footer .bg',
                    // top: [{ value: 80 }, { value: 0, duration: 1000 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 350 }],
                    easing: 'easeInOutQuad',
                });
                anime({
                    targets: '.footer .social-links',
                    top: [{ value: -60 }, { value: 0, duration: 650 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 300 }],
                    easing: 'easeInOutQuad',
                    delay: anime.stagger(250),
                });
                anime({
                    targets: '.footer .main-text',
                    top: [{ value: 50 }, { value: 0, duration: 600 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 300 }],
                    easing: 'easeInOutQuad',
                    delay: anime.stagger(150),
                });
                anime({
                    targets: '.footer .img',
                    // top: [{ value: 60 }, { value: 0, duration: 600 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 650 }],
                    easing: 'easeInOutQuad',
                    delay: anime.stagger(400, { start: 1500 }),
                });
                anime({
                    targets: '.footer .links',
                    top: [{ value: 30 }, { value: 0, duration: 400 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 300 }],
                    easing: 'easeInOutQuad',
                    delay: anime.stagger(100, { start: 600 }),
                });
                anime({
                    targets: '.footer .copyright',
                    top: [{ value: 30 }, { value: 0, duration: 600 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 300 }],
                    easing: 'easeInOutQuad',
                    delay: anime.stagger(200, { start: 1000 }),
                });
            },
            true,
        );
    }
}
