import { Directive, HostListener, HostBinding, Output, EventEmitter, Input } from '@angular/core';

@Directive({
    selector: '[fileDragDrop]',
    standalone: true,
})
export class FileDragNDropDirective {
    // @Input() private allowed_extensions : Array<string> = ['png', 'jpg', 'bmp'];
    @Output() private filesChangeEmiter: EventEmitter<File[]> = new EventEmitter();
    //@Output() private filesInvalidEmiter : EventEmitter<File[]> = new EventEmitter();
    @HostBinding('style.background') private background!: string;
    @HostBinding('style.border') private borderStyle!: string;
    @HostBinding('style.border-color') private borderColor!: string;
    @HostBinding('style.border-radius') private borderRadius!: string;

    constructor() {}

    @HostListener('dragover', ['$event']) public onDragOver(evt: DragEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = 'lightgray';
        this.borderColor = 'cadetblue';
        this.borderStyle = '3px solid';
    }

    @HostListener('dragleave', ['$event']) public onDragLeave(evt: DragEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        this.background = '';
        this.borderColor = '';
        this.borderStyle = '';
    }

    @HostListener('drop', ['$event']) public onDrop(evt: DragEvent) {
        evt.preventDefault();
        evt.stopPropagation();
        // this.background = '#eee';
        // this.borderColor = '#696D7D';
        // this.borderStyle = '2px dashed';
        debugger;
        let files = evt.dataTransfer!.files;
        let valid_files: FileList = files;
        this.filesChangeEmiter.emit(valid_files as any);
    }
}
