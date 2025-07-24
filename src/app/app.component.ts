import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { AuthService } from './_services/auth.service';
import { CommonModule } from '@angular/common';
import { GlobalService } from './_services/global.service';
import { RegisterComponent } from "./components/register/register.component";

@Component({
  selector: 'app-root',
  imports: [ButtonModule, HeaderComponent, RouterOutlet, CommonModule, RegisterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent implements OnInit {
  registerVisible = false;

  constructor(
    private auth: AuthService,
    private globalService: GlobalService
  ) {}
  ngOnInit(): void {
    this.globalService.sender.subscribe((res) => {
      this.registerVisible = res;
    });

    this.auth.DecodeToken();
  }
}
