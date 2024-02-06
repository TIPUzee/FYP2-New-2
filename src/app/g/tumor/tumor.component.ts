import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HtmlService } from '../../services/html/html.service';

@Component({
    selector: 'app-tumor',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './tumor.component.html',
    styleUrl: './tumor.component.scss',
})
export class TumorComponent implements AfterViewInit {
    constructor(public htmlService: HtmlService) {}

    ngAfterViewInit(): void {
        this.htmlService.scrollToTop();
    }
}
