import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { HeroComponent } from '../hero/hero.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCalendarCheck, faClock, faRobot } from '@fortawesome/free-solid-svg-icons';
import anime from 'animejs/lib/anime.es.js';
import { HtmlService } from '../../services/html/html.service';
import { ViewportScroller } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-home',
    standalone: true,
    imports: [HeroComponent, FontAwesomeModule, RouterLink],
    templateUrl: './home.component.html',
    styleUrl: './home.component.scss',
})
export class HomeComponent implements AfterViewInit {
    @ViewChild('featuresCards') featuresCards!: ElementRef<HTMLDivElement>;
    
    @ViewChild('aboutSection') aboutSection!: ElementRef<HTMLDivElement>;
    @ViewChild('aboutSectionQuestionContainerLg') aboutSectionQuestionContainerLg!: ElementRef<HTMLDivElement>;
    @ViewChild('aboutSectionQuestionContainerXl') aboutSectionQuestionContainerXl!: ElementRef<HTMLDivElement>;
    
    @ViewChild('faqSection') faqSection!: ElementRef<HTMLDivElement>;
    @ViewChild('faqQuestionContainerLg') faqQuestionContainerLg!: ElementRef<HTMLDivElement>;
    @ViewChild('faqQuestionContainerXl') faqQuestionContainerXl!: ElementRef<HTMLDivElement>;
    
    @ViewChild('doctorsTreatingPatientsVideoContainer') doctorsTreatingPatientsVideoContainer!: ElementRef<HTMLDivElement>;
    @ViewChild('doctorsTreatingPatientsVideo') doctorsTreatingPatientsVideo!: ElementRef<HTMLVideoElement>;
    @ViewChild('doctorsTreatingPatientsMorphismContent') doctorsTreatingPatientsMorphismContent!: ElementRef<HTMLDivElement>;
    
    @ViewChild('analyticsSection') analyticsSection!: ElementRef<HTMLDivElement>;
    @ViewChild('analyticsPatientsIncrease') analyticsPatientsIncrease!: ElementRef<HTMLDivElement>;
    @ViewChild('analyticsPatientsIncreaseNumbers') analyticsPatientsIncreaseNumbers!: ElementRef<HTMLDivElement>;
    @ViewChild('analyticsNetworkExpansion') analyticsNetworkExpansion!: ElementRef<HTMLDivElement>;
    @ViewChild('analyticsNetworkExpansionNumbers') analyticsNetworkExpansionNumbers!: ElementRef<HTMLDivElement>;
    @ViewChild('analyticsPredictionAccuracy') analyticsPredictionAccuracy!: ElementRef<HTMLDivElement>;
    @ViewChild('analyticsPredictionAccuracyNumbers') analyticsPredictionAccuracyNumbers!: ElementRef<HTMLDivElement>;
    @ViewChild('analyticsPositiveOutcomes') analyticsPositiveOutcomes!: ElementRef<HTMLDivElement>;
    @ViewChild('analyticsPositiveOutcomesNumbers') analyticsPositiveOutcomesNumbers!: ElementRef<HTMLDivElement>;
    
    @ViewChild('testimonialsSection') testimonialsSection!: ElementRef<HTMLDivElement>;
    faCalendarCheck = faCalendarCheck;
    faClock = faClock;
    faRobot = faRobot;
    
    constructor(public htmlService: HtmlService, public scroller: ViewportScroller) {
    }
    
    ngAfterViewInit(): void {
        this.htmlService.scrollToTop();
        this.htmlService.initTailwindElements();
        this.animateElements();
    }
    
    animateElements(): void {
        this.htmlService.onInView(
            this.featuresCards.nativeElement,
            50,
            50,
            () => {
                anime({
                    targets: '.features-cards .card',
                    top: [{ value: 150 }, { value: 0, duration: 600 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 250 }],
                    easing: 'easeOutQuad',
                    delay: anime.stagger(150, { from: 'center' }),
                });
            },
            true,
        );
        this.htmlService.onInView(
            this.aboutSection.nativeElement,
            200,
            200,
            () => {
                anime({
                    targets: '.about-section .side-img',
                    translateX: [{ value: -80 }, { value: 0, duration: 700 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 300 }],
                    easing: 'easeOutQuad',
                });
                anime({
                    targets: '.about-section .side-upper-text',
                    translateX: [{ value: 80 }, { value: 0, duration: 700 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 300 }],
                    easing: 'easeOutQuad',
                    delay: anime.stagger(250),
                });
            },
            true,
        );
        this.htmlService.onInView(
            this.faqSection.nativeElement,
            200,
            200,
            () => {
                anime({
                    targets: '.faq-section .side-img',
                    translateX: [{ value: 80 }, { value: 0, duration: 700 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 300 }],
                    easing: 'easeOutQuad',
                });
                anime({
                    targets: '.faq-section .side-question',
                    translateY: [{ value: 80 }, { value: 0, duration: 600 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 300 }],
                    easing: 'easeOutQuad',
                    delay: anime.stagger(150, { start: 700 }),
                });
                anime({
                    targets: '.faq-section .side-upper-text',
                    translateX: [{ value: -80 }, { value: 0, duration: 700 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 300 }],
                    easing: 'easeOutQuad',
                    delay: anime.stagger(250),
                });
            },
            true,
        );
        this.htmlService.onInView(
            this.aboutSectionQuestionContainerLg.nativeElement,
            200,
            200,
            () => {
                anime({
                    targets: '.about-section .side-question',
                    translateY: [{ value: 80 }, { value: 0, duration: 700 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 300 }],
                    easing: 'easeOutQuad',
                    delay: anime.stagger(250, { start: 700 }),
                });
            },
            true,
        );
        this.htmlService.onInView(
            this.aboutSectionQuestionContainerXl.nativeElement,
            200,
            200,
            () => {
                anime({
                    targets: '.about-section .side-question',
                    translateY: [{ value: 80 }, { value: 0, duration: 700 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 300 }],
                    easing: 'easeOutQuad',
                    delay: anime.stagger(250),
                });
            },
            true,
        );
        // this.htmlService.onInView(
        //     this.faqQuestionContainerLg.nativeElement,
        //     50,
        //     50,
        //     () => {
        //         anime({
        //             targets: '.faq-section .side-question',
        //             translateY: [{ value: 80 }, { value: 0, duration: 300 }],
        //             opacity: [{ value: 0 }, { value: 1, duration: 100 }],
        //             easing: 'easeOutQuad',
        //             delay: anime.stagger(150),
        //         });
        //     },
        //     true,
        // );
        // this.htmlService.onInView(
        //     this.faqQuestionContainerXl.nativeElement,
        //     50,
        //     50,
        //     () => {
        //         anime({
        //             targets: '.faq-section .side-question',
        //             translateY: [{ value: 80 }, { value: 0, duration: 300 }],
        //             opacity: [{ value: 0 }, { value: 1, duration: 100 }],
        //             easing: 'easeOutQuad',
        //             delay: anime.stagger(150),
        //         });
        //     },
        //     true,
        // );
        this.htmlService.onInView(
            this.doctorsTreatingPatientsVideoContainer.nativeElement,
            200,
            200,
            () => {
                anime({
                    targets: '.doctors-treating-patients-section .video',
                    top: [{ value: 80 }, { value: 0, duration: 400 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 200 }],
                    easing: 'easeOutQuad',
                    delay: anime.stagger(250),
                });
                anime({
                    targets: '.doctors-treating-patients-section .morphism',
                    opacity: [{ value: 0 }, { value: 1, duration: 400, delay: 200 }],
                    easing: 'easeOutQuad',
                });
                anime({
                    targets: '.doctors-treating-patients-section .morphism .animation-text',
                    left: [{ value: 70 }, { value: 0, duration: 600 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 300 }],
                    easing: 'easeOutQuad',
                    delay: anime.stagger(200, { start: 500 }),
                });
            },
            true,
        );
        this.htmlService.onInView(
            this.analyticsSection.nativeElement,
            200,
            200,
            () => {
                anime({
                    targets: '.analytics-section .bg-img',
                    translateX: [{ value: 80 }, { value: 0, duration: 600 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 300 }],
                    easing: 'easeOutQuad',
                });
                anime({
                    targets: '.analytics-section .glass',
                    // translateX: [{ value: -60 }, { value: 0, duration: 400 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 700 }],
                    easing: 'easeOutQuad',
                });
                anime({
                    targets: '.analytics-section .text',
                    translateX: [{ value: -80 }, { value: 0, duration: 700 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 300 }],
                    easing: 'easeOutQuad',
                    delay: anime.stagger(250, { start: 300 }),
                });
                anime({
                    targets: '.analytics-section .analytics-box',
                    translateY: [{ value: 30 }, { value: 0, duration: 500 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 300 }],
                    easing: 'easeOutQuad',
                    delay: anime.stagger(250, { start: 700 }),
                });
            },
            true,
        );
        console.log(this.analyticsPatientsIncrease);
        this.htmlService.onInView(
            this.analyticsPatientsIncrease.nativeElement,
            200,
            200,
            () => {
                // anime({
                //     targets: '.analytics-patients-increase .title',
                //     translateY: [{ value: 30 }, { value: 0, duration: 400 }],
                //     opacity: [{ value: 0 }, { value: 1, duration: 300 }],
                //     easing: 'easeOutQuad',
                //     delay: 300,
                // });
                anime({
                    targets: '.analytics-patients-increase .numbers',
                    easing: 'easeInOutQuad',
                    delay: 4000,
                    duration: 4000,
                    update: anim => {
                        this.analyticsPatientsIncreaseNumbers.nativeElement.innerHTML = Math.round((90 / 100) * anim.progress) + '%';
                    },
                });
            },
            true,
        );
        this.htmlService.onInView(
            this.analyticsNetworkExpansion.nativeElement,
            200,
            200,
            () => {
                // anime({
                //     targets: '.analytics-network-expansion .title',
                //     translateY: [{ value: 30 }, { value: 0, duration: 400 }],
                //     opacity: [{ value: 0 }, { value: 1, duration: 300 }],
                //     easing: 'easeOutQuad',
                //     delay: 300,
                // });
                anime({
                    targets: '.analytics-network-expansion .numbers',
                    easing: 'easeInOutQuad',
                    delay: 4000,
                    duration: 4300,
                    update: anim => {
                        this.analyticsNetworkExpansionNumbers.nativeElement.innerHTML = Math.round((70 / 100) * anim.progress) + '%';
                    },
                });
            },
            true,
        );
        this.htmlService.onInView(
            this.analyticsPredictionAccuracy.nativeElement,
            200,
            200,
            () => {
                // anime({
                //     targets: '.analytics-prediction-accuracy .title',
                //     translateY: [{ value: 30 }, { value: 0, duration: 400 }],
                //     opacity: [{ value: 0 }, { value: 1, duration: 300 }],
                //     easing: 'easeOutQuad',
                //     delay: 300,
                // });
                anime({
                    targets: '.analytics-prediction-accuracy .numbers',
                    easing: 'easeInOutQuad',
                    delay: 4000,
                    duration: 4600,
                    update: anim => {
                        this.analyticsPredictionAccuracyNumbers.nativeElement.innerHTML = Math.round((72 / 100) * anim.progress) + '%';
                    },
                });
            },
            true,
        );
        this.htmlService.onInView(
            this.analyticsPositiveOutcomes.nativeElement,
            200,
            200,
            () => {
                // anime({
                //     targets: '.analytics-positive-outcomes .title',
                //     translateY: [{ value: 30 }, { value: 0, duration: 400 }],
                //     opacity: [{ value: 0 }, { value: 1, duration: 300 }],
                //     easing: 'easeOutQuad',
                //     delay: 300,
                // });
                anime({
                    targets: '.analytics-positive-outcomes .numbers',
                    easing: 'easeInOutQuad',
                    delay: 4000,
                    duration: 4900,
                    update: anim => {
                        this.analyticsPositiveOutcomesNumbers.nativeElement.innerHTML = Math.round((80 / 100) * anim.progress) + '%';
                    },
                });
            },
            true,
        );
        this.htmlService.onInView(
            this.testimonialsSection.nativeElement,
            200,
            200,
            () => {
                anime({
                    targets: '.testimonials .title',
                    translateY: [{ value: -30 }, { value: 0, duration: 400 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 300 }],
                    easing: 'easeOutQuad',
                });
                anime({
                    targets: '.testimonials .profile-img',
                    translateY: [{ value: -50 }, { value: 0, duration: 700 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 300 }],
                    easing: 'easeOutQuad',
                    delay: anime.stagger(250),
                });
                anime({
                    targets: '.testimonials .back-layer-container',
                    top: [{ value: 60 }, { value: 0, duration: 700 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 200 }],
                    easing: 'easeOutQuad',
                    delay: anime.stagger(250),
                });
                anime({
                    targets: '.testimonials .name',
                    translateY: [{ value: 60 }, { value: 0, duration: 700 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 200 }],
                    easing: 'easeOutQuad',
                    delay: anime.stagger(250, { start: 700 }),
                });
                anime({
                    targets: '.testimonials .stars',
                    translateY: [{ value: 60 }, { value: 0, duration: 700 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 200 }],
                    easing: 'easeOutQuad',
                    delay: anime.stagger(250, { start: 900 }),
                });
                anime({
                    targets: '.testimonials .specialization',
                    translateY: [{ value: 60 }, { value: 0, duration: 700 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 200 }],
                    easing: 'easeOutQuad',
                    delay: anime.stagger(250, { start: 1200 }),
                });
                anime({
                    targets: '.testimonials .review',
                    translateY: [{ value: 60 }, { value: 0, duration: 700 }],
                    opacity: [{ value: 0 }, { value: 1, duration: 200 }],
                    easing: 'easeOutQuad',
                    delay: anime.stagger(250, { start: 1400 }),
                });
                // anime({
                //     targets: '.analytics-positive-outcomes .numbers',
                //     easing: 'easeInOutQuad',
                //     delay: 4000,
                //     duration: 4900,
                //     update: anim => {
                //         this.analyticsPositiveOutcomesNumbers.nativeElement.innerHTML = Math.round((80 / 100) *
                // anim.progress) + '%'; }, });
            },
            true,
        );
    }
}
