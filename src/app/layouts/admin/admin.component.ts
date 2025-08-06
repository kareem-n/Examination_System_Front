import { Component } from '@angular/core';
import { Router, RouterLink, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin',
  imports: [ RouterOutlet , RouterLink], 
  templateUrl: './admin.component.html', 
  styleUrl: './admin.component.css'
})
export class AdminComponent {

    constructor(private router: Router) {}
    navigate(path: string) {
    this.router.navigate([`/admin/${path}`]);
  }


}
