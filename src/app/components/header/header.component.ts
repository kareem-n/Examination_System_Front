import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TieredMenu, TieredMenuModule } from 'primeng/tieredmenu';

import { ToolbarModule } from 'primeng/toolbar';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { GlobalService } from '../../_services/global.service';

@Component({
  selector: 'app-header',
  imports: [
    ToolbarModule,
    ButtonModule,
    AvatarModule,
    RouterLinkActive,
    RouterLink,
    TieredMenuModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent implements OnInit {
  items: {
    label?: string;
    icon?: string;
    separator?: boolean;
    routerLink?: string[];
    command?: () => void;
  }[] = [];

  constructor(
    protected activeRoute: ActivatedRoute,
    private auth: AuthService,
    private globalService: GlobalService
  ) {}
  ngOnInit(): void {
    if (this.auth.IsAuth()) {
      this.items.push(
        {
          label: 'Profile',
          icon: 'pi pi-search',
        },
        {
          separator: true,
        },
        {
          label: 'Logout',
          icon: 'pi pi-search',
        }
      );
    } else {
      this.items.push(
        {
          label: 'Login',
          icon: 'pi pi-file',
          routerLink: ['/login'],
        },
        {
          label: 'Create Account',
          icon: 'pi pi-file-edit',
          command: () => this.visibleRegister(),
        }
      );
    }
  }

  visibleRegister() {
    this.globalService.setRegisterVisible(true);
  }
}
