import { Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { blurTransformAnimation } from '../../services/animations/animations';

@Component({
    selector: 'app-dash',
    standalone: true,
    imports: [NavbarComponent, SidebarComponent, RouterOutlet, LoadingBarRouterModule],
    templateUrl: './dash.component.html',
    styleUrl: './dash.component.scss',
    animations: [blurTransformAnimation],
})
export class DashComponent {
    constructor(private contexts: ChildrenOutletContexts) {}

    getRouteAnimationData() {
        return this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
    }
}
