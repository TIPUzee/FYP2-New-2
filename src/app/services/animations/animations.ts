import { animate, animateChild, group, query, style, transition, trigger } from '@angular/animations';

export const blurTransformAnimation = trigger('routeAnimations', [
    transition('* <=> *', [
        query(':leave', animateChild(), { optional: true }),
        query(':self', [style({ filter: 'url(#threshold) blur(0)', display: 'block' })]),
        query(':enter', [style({ opacity: 0, filter: 'blur(50px)' })], { optional: true }),
        query(':leave', [style({ opacity: 1, filter: 'blur(0)' })], { optional: true }),
        query(':enter, :leave', [style({ display: 'block', position: 'absolute', top: 0, left: 0, width: '100%' })], {
            optional: true,
        }),
        // query(':self', [animate('40ms ease-in-out', style({ filter: 'url(#threshold) blur(1px)' }))], { optional:
        // false }),
        group([
            query(':leave', [
                animate('200ms linear', style({
                    filter: 'blur(20px)',
                    opacity: 0.8
                }))
            ], { optional: true }),
            query(':enter', [
                animate('200ms linear', style({
                    filter: 'blur(20px)',
                    opacity: 0.3
                }))
            ], { optional: true }),
        ]),
        group([
            query(':leave', [
                animate('100ms linear', style({
                    filter: 'blur(30px)',
                    opacity: 0.7
                }))
            ], { optional: true }),
            query(':enter', [
                animate('100ms linear', style({
                    filter: 'blur(30px)',
                    opacity: 0.6
                }))
            ], { optional: true }),
        ]),
        group([
            query(':leave', [animate('150ms linear', style({ filter: 'blur(20px)', opacity: 0 }))], { optional: true }),
            query(':enter', [animate('150ms linear', style({ filter: 'blur(20px)', opacity: 1 }))], { optional: true }),
        ]),
        group([
            query(':leave', [
                animate('100ms ease-in-out', style({
                    filter: 'blur(0)',
                    opacity: 0
                }))
            ], { optional: true }),
            query(':enter', [
                animate('100ms ease-in-out', style({
                    filter: 'blur(0)',
                    opacity: 1
                }))
            ], { optional: true }),
        ]),
        query(':self', [animate('10ms linear', style({ filter: 'url(#threshold) blur(0)' }))], { optional: false }),
        query('@*', animateChild(), { optional: true }),
    ]),
]);

export const NotificationAddRemoveAnimation = trigger('NotificationAddRemoveAnimation', [
    transition(':enter', [
        style({ transform: 'translateY(15px)', opacity: 0 }),
        group(
            [
                animate('100ms ease-out', style({ opacity: 1 })),
                animate('200ms ease-out', style({ transform: 'translateY(0)' })),
            ]
        )
    ]),
    transition(':leave', [
        style({ transform: 'translateY(0)', opacity: 1 }),
        animate('400ms ease-out', style({ transform: 'translateY(-20px)', opacity: 0, height: 0, marginBottom: 0 })),
    ]),
]);

export const expandCollapseAnimation = trigger('expandCollapse', [
    transition(':enter', [
        style({ display: 'grid', gridTemplateRows: '0fr', overflow: 'hidden' }),
        animate('600ms ease-in-out', style({ gridTemplateRows: '1fr' })),
    ]),
    transition(':leave', [
        animate('600ms ease-in-out', style({ 'grid-template-rows': '1fr' })),
    ]),
]);
