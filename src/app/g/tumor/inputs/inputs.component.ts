import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import anime from 'animejs';
import { FileDragNDropDirective } from '../../../directives/file-drag-n-drop.directive';

@Component({
    selector: 'app-inputs',
    standalone: true,
    imports: [RouterLink, FileDragNDropDirective],
    templateUrl: './inputs.component.html',
    styleUrl: './inputs.component.scss',
})
export class InputsComponent {}
