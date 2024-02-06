import { AfterViewInit, Component } from '@angular/core';
import { NavbarComponent } from './navbar/navbar.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { ChildrenOutletContexts, RouterOutlet } from '@angular/router';
import { LoadingBarRouterModule } from '@ngx-loading-bar/router';
import { blurTransformAnimation } from '../../services/animations/animations';
import { RightSidebarComponent } from "../../utils/components/right-sidebar/right-sidebar.component";

@Component({
    selector: 'app-dash',
    standalone: true,
    imports: [NavbarComponent, SidebarComponent, RouterOutlet, LoadingBarRouterModule, RightSidebarComponent],
    templateUrl: './dash.component.html',
    styleUrl: './dash.component.scss',
    animations: [blurTransformAnimation],
})
export class DashComponent implements AfterViewInit {
    oldRouterAnimationState = false;

    constructor(private contexts: ChildrenOutletContexts) {
    }

    ngAfterViewInit(): void {
    }

    getRouteAnimationData() {
        // this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation']
        if (this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'] == 'login') {
            return this.oldRouterAnimationState;
        } else {
            this.oldRouterAnimationState = this.contexts.getContext('primary')?.route?.snapshot?.data?.['animation'];
            return this.oldRouterAnimationState;
        }
    }
}
