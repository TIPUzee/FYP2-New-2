import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ComponentFactoryResolver, Input, OnInit, Output, ViewChild, ViewContainerRef, EventEmitter, OnDestroy } from '@angular/core';
import { OffcanvasService } from './offcanvas.service';

@Component({
    selector: 'app-offcanvas',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './offcanvas.component.html',
    styleUrl: './offcanvas.component.scss',
})
export class OffcanvasComponent implements OnInit, AfterViewInit, OnDestroy {
    @Input({ required: true }) component!: any;
    @Output() onClose = new EventEmitter<boolean>();

    @ViewChild('componentPlaceHolder', { read: ViewContainerRef }) public componentPlaceHolder!: ViewContainerRef;

    constructor(private resolver: ComponentFactoryResolver, public offcanvasService: OffcanvasService) {}

    async ngOnInit() {}

    async ngAfterViewInit() {
        this.componentPlaceHolder.clear();
        if (this.component) {
            this.offcanvasService.anyOffcanvasOpened += 1;
            await this.component().then((x: any) => {
                const componentFactory = this.resolver.resolveComponentFactory(x);
                const component = this.componentPlaceHolder.createComponent(componentFactory);
            });
        }
    }

    ngOnDestroy(): void {
        this.offcanvasService.anyOffcanvasOpened -= 1;
    }
}
