import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { HeroComponent } from './hero/hero.component';
import { HtmlService } from '../services/html/html.service';
import { RouterOutlet } from '@angular/router';
import { FooterComponent } from './footer/footer.component';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';

@Component({
    selector: 'app-g',
    standalone: true,
    imports: [NavbarComponent, HeroComponent, FooterComponent, RouterOutlet, LoadingBarRouterModule],
    templateUrl: './g.component.html',
    styleUrl: './g.component.scss',
})
export class GComponent {
    constructor(private htmlSerice: HtmlService) {
        this.htmlSerice.body().classList.add('lg:pt-[142px]');
        this.htmlSerice.body().classList.add('pt-[100px]');
        this.htmlSerice.body().classList.add('bg-primarys');
    }
}
