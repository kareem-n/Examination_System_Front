import { Component } from '@angular/core';
import { DrawerModule } from 'primeng/drawer';
import { ButtonModule } from 'primeng/button';
import { Ripple } from 'primeng/ripple';
import { AvatarModule } from 'primeng/avatar';
import { Drawer } from 'primeng/drawer';
import { Router } from '@angular/router';
import { TieredMenuModule } from 'primeng/tieredmenu';

@Component({
  selector: 'app-admin-sidebar',
  imports: [
    DrawerModule,
    ButtonModule,
    Ripple,
    AvatarModule,
    Drawer,
    TieredMenuModule
    
  ],
  templateUrl: './admin-sidebar.component.html',
  styleUrl: './admin-sidebar.component.css',
})
export class AdminSidebarComponent {

   constructor(private router: Router) {}

  navigate(path: string) {
    this.router.navigate([`/admin/${path}`]);
  }

  logout() {
    // Your logout logic
    console.log('Logging out...');
    this.router.navigate(['/login']);
  }

  closeCallback(e: any) {}
}
