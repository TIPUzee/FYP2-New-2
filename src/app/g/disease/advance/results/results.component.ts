import { CommonModule } from '@angular/common';
import { AfterViewInit, Component } from '@angular/core';
import { CommonService } from '../../../../services/common/common.service';
import { HtmlService } from '../../../../services/html/html.service';
import anime from 'animejs/lib/anime.es.js';
import { preserveWhitespacesDefault } from '@angular/compiler';
import { RouterLink } from '@angular/router';

@Component({
    selector: 'app-results',
    standalone: true,
    imports: [CommonModule, RouterLink],
    templateUrl: './results.component.html',
    styleUrl: './results.component.scss',
})
export class ResultsComponent implements AfterViewInit {
    constructor(public commonService: CommonService, private htmlService: HtmlService) {}

    ngAfterViewInit(): void {
        setTimeout(() => {
            this.htmlService.scrollToTop();
        }, 1);
        setTimeout(() => {
            this.animateChunks();
        }, 50);
    }

    disease = 'Drug Reaction';
    basedOnSymptoms = '- Based on your symptoms, our analysis suggests the possibility of Drug Reaction.';

    description = [
        "Drug reactions refer to the body's response to a medication or substance, often resulting in various symptoms or side effects. These reactions can range from mild to severe and may manifest in different forms, including rashes, itching, nausea, or more severe complications like anaphylaxis.",
        "In many cases, drug reactions occur due to the body's sensitivity to specific medications or their components. They can also result from interactions between different drugs or from allergic responses triggered by certain substances.",
        "It's crucial to report any adverse reactions or unexpected symptoms experienced after taking medication to healthcare professionals promptly. Understanding and recognizing drug reactions can aid in preventing further complications and ensuring safe and effective treatment.",
    ];

    precautions = [
        'If someone experiences a drug reaction, here are general steps they can take at home:',
        'Stop the Medication: Discontinue the medication immediately upon noticing any adverse reactions and inform your healthcare provider.',
        'Hydration: Drink plenty of fluids, preferably water, to stay hydrated and help flush out the medication from your system.',
        'Cool Compress: Apply a cool, damp cloth or cool compress to areas experiencing itching or rashes to soothe the skin.',
        'Avoid Scratching: Refrain from scratching the affected area, as it may worsen the irritation or cause further complications.',
        'Rest: Get ample rest to aid the body in recovering from the reaction and allow it to heal.',
        'Over-the-Counter Remedies: Over-the-counter antihistamines or topical creams, as recommended by a pharmacist or healthcare professional, might help alleviate itching or discomfort.',
        'Consult a Doctor: Seek immediate medical advice or visit an emergency room if the symptoms are severe, persistent, or if breathing difficulties, swelling, or signs of anaphylaxis occur.',
        'Always follow the guidance provided by healthcare professionals and seek medical attention for severe or persistent drug reactions.',
    ];

    animateChunks(): void {
        let nextBreak = 0;
        let currentDelay = 0;
        let currentSpeed = 0;
        let prevResult = 0;
        anime({
            targets: '.chunk',
            height: [{ value: 0 }, { value: '25px', duration: 400 }],
            opacity: [{ value: 0 }, { value: 1, duration: 300 }],
            easing: 'easeInOutQuad',
            delay: (el, i) => {
                if (i == nextBreak) {
                    nextBreak += this.commonService.getRandomNumber(40, 80);
                    currentDelay = this.commonService.getRandomNumber(200, 1500);
                    prevResult += currentDelay;
                }
                currentSpeed = this.commonService.getRandomNumber(5, 40);
                prevResult += currentSpeed;
                return prevResult;
            },
            complete: a => {
                anime({
                    targets: '.animate-spin',
                    opacity: 0,
                    duration: 200,
                    easing: 'easeInOutQuad',
                });
            },
        });
    }
}
