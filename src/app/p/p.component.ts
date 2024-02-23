import { AfterViewInit, Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HtmlService } from '../services/html/html.service';
import { UtilsService } from '../services/utils/utils.service';

@Component({
    selector: 'app-p',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './p.component.html',
    styleUrl: './p.component.scss',
})
export class PComponent implements AfterViewInit {
    constructor(private htmlService: HtmlService, private utilsService: UtilsService) {
        utilsService.setCurrentUser('p');
    }
    
    
    ngAfterViewInit(): void {
        this.htmlService.body().classList.remove('lg:pt-[142px]');
        this.htmlService.body().classList.remove('pt-[100px]');
        this.htmlService.body().classList.remove('bg-primarys');
    }
}
