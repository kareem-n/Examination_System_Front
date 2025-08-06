import {
  Component,
  ElementRef,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { AvatarModule } from 'primeng/avatar';
import { TieredMenuModule } from 'primeng/tieredmenu';
import { ToolbarModule } from 'primeng/toolbar';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
} from '@angular/router';
import { AuthService } from '../../_services/auth.service';
import { GlobalService } from '../../_services/global.service';
import { SignalRService } from '../../_services/notificationService/signal-r.service';
import { BadgeModule } from 'primeng/badge';
import { Divider } from 'primeng/divider';
import { INotification } from '../../interfaces/INotifcations';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  imports: [
    ToolbarModule,
    ButtonModule,
    AvatarModule,
    RouterLinkActive,
    RouterLink,
    TieredMenuModule,
    BadgeModule,
    CommonModule,
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

  items2: INotification[] = [];

  notificationVisible: boolean = false;

  @ViewChild('notificationBox', { static: false }) notificationBox!: ElementRef;

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.notificationVisible && this.notificationBox) {
      const clickedInside = this.notificationBox.nativeElement.contains(
        event.target
      );
      if (!clickedInside) {
        this.notificationVisible = false;
        this.items2 = this.items2.map((item) => {
          item.isRead = true;
          return item;
        });
      }
    }
  }

  counter: number = 0;
  constructor(
    private router: Router,
    protected activeRoute: ActivatedRoute,
    private auth: AuthService,
    private globalService: GlobalService,
    private SignalRService: SignalRService
  ) {}
  private isAuth = false;
  ngOnInit(): void {
    this.SignalRService.GetNotifcations().subscribe({
      next: (res) => {
        // if (res.data.length > 0) {
        // let not = res.data.map((n) => {
        //   return { label: n?.['message'] };
        // });
        
        this.items2 = res.data;
        console.log(this.items2);
        this.counter = res.data.length;
        // this.SignalRService.$messages.next(not);
        // }
      },
    });

    this.SignalRService.startConnection();
    this.SignalRService.onReceiveNotification((msg) => {
      this.items2.unshift(msg);
      this.counter = this.items2.length;
    });

    this.auth.isAuth.subscribe({
      next: (res) => {
        this.isAuth = res;
        this.checkAvatarItems();
        console.log(res);
      },
    });
  }

  checkAvatarItems() {
    this.items = [];
    if (this.isAuth) {
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
          icon: 'pi pi-sign-out',
          command: () => {
            this.auth.Logout();
            this.router.navigateByUrl('/login');
          },
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

  viewNotifcation() {
    this.notificationVisible = true;
  }

  visibleRegister() {
    this.globalService.setRegisterVisible(true);
  }
}
