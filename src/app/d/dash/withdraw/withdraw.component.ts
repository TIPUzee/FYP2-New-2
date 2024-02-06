import { AfterViewInit, Component } from '@angular/core';
import { HtmlService } from '../../../services/html/html.service';

@Component({
    selector: 'app-withdraw',
    standalone: true,
    imports: [],
    templateUrl: './withdraw.component.html',
    styleUrl: './withdraw.component.scss',
})
export class WithdrawComponent implements AfterViewInit {
    constructor(private htmlService: HtmlService) {}

    ngAfterViewInit(): void {
        this.htmlService.initTailwindElements();
    }
}
