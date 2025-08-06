import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-student-home-page',
  imports: [RouterLink, ButtonModule],
  templateUrl: './student-home-page.component.html',
  styleUrl: './student-home-page.component.css'
})
export class StudentHomePageComponent {

}
