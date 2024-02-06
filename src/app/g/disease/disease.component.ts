import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';

@Component({
    selector: 'app-disease',
    standalone: true,
    imports: [RouterOutlet],
    templateUrl: './disease.component.html',
    styleUrl: './disease.component.scss',
})
export class DiseaseComponent {}
