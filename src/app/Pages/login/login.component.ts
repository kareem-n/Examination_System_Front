import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FloatLabelModule } from 'primeng/floatlabel';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { Message } from 'primeng/message';
import { AuthService } from '../../_services/auth.service';
import { errorContext } from 'rxjs/internal/util/errorContext';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  imports: [
  FloatLabelModule,
    CommonModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    ReactiveFormsModule,
    Message,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  loginForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
    ]),
  });

  serverErrorMsg: string = '';

  constructor(public authService: AuthService , private nav:Router) {}

  onSubmit() {
    if (this.loginForm.valid) {
      this.authService
        .Login({
          email: this.loginForm.value.email!,
          password: this.loginForm.value.password!,
        })
        .subscribe(
          (res:any) => {
            localStorage.setItem("token" ,res?.['data']?.['accessToken'])
            this.authService.DecodeToken();
            this.nav.navigate(["/"])
          },
          (err) => {
            this.serverErrorMsg = err?.['error']?.['message'];
            console.log(err);
          }
        );
    } else {
      this.loginForm.markAllAsTouched();
    }
  }
}
