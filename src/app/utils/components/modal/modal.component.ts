import { CommonModule } from '@angular/common';
import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { ModalService } from './modal.service';

@Component({
    selector: 'app-modal',
    standalone: true,
    imports: [CommonModule],
    templateUrl: './modal.component.html',
    styleUrl: './modal.component.scss',
})
export class ModalComponent implements AfterViewInit {
    ModalComponent = ModalComponent;

    @ViewChild('opener') opener!: ElementRef<HTMLButtonElement>;
    @ViewChild('closer') closer!: ElementRef<HTMLButtonElement>;
    dismissBtns!: NodeListOf<Element>;
    modalId: number;
    currentOpeningId: number | null = null;
    noCurrentlyOpenedModals!: number;

    constructor(private el: ElementRef, public modalService: ModalService) {
        // init ID
        this.modalId = this.modalService.generateId();
        // init subjects
        this.noCurrentlyOpenedModals = this.modalService._noCurrentlyOpenedModal;
        this.modalService.noCurrentlyOpenedModalSubject.subscribe(count => {
            this.noCurrentlyOpenedModals = count;
        });
    }

    ngAfterViewInit(): void {
        // select data-te-modal-dismiss elements
        this.initDismissBtns();
    }

    initDismissBtns(): void {
        this.dismissBtns = (<HTMLElement>this.el.nativeElement).querySelectorAll('[data-te-modal-dismiss]');
        this.dismissBtns.forEach((ele, _, __) => {
            ele.addEventListener('click', _event => {
                this.currentOpeningId = this.modalService.dismissOpeningId();
            });
        });
    }

    public open(): void {
        this.currentOpeningId = this.modalService.generateOpeningId();
        this.opener.nativeElement.click();
    }

    public close(): void {
        this.closer.nativeElement.click();
    }
}
