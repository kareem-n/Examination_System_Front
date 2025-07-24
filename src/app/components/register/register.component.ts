import { Component, OnInit } from '@angular/core';
import { Dialog } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { GlobalService } from '../../_services/global.service';
import { RouterLink } from '@angular/router';
import { Message } from 'primeng/message';

import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
  ValidationErrors,
  AbstractControl,
} from '@angular/forms';
import { AuthService } from '../../_services/auth.service';
@Component({
  selector: 'app-register',
  imports: [
    Dialog,
    ButtonModule,
    InputTextModule,
    RouterLink,
    ReactiveFormsModule,
    Message,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent implements OnInit {
  registerForm = new FormGroup(
    {
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [
        Validators.required,
        this.PasswordValidationComplexity,
      ]),
      cpassword: new FormControl('', [Validators.required]),
    },
    {
      validators: this.matchPasswords('password', 'cpassword'),
    }
  );

  serverError: string = '';

  PasswordValidationComplexity(
    control: AbstractControl
  ): ValidationErrors | null {
    const value = control.value;

    if (!value) return null;

    const hasUpperCase = /[A-Z]/.test(value);
    const hasLetter = /[a-zA-Z]/.test(value);
    const hasNumber = /\d/.test(value);

    const isValid = hasUpperCase && hasLetter && hasNumber;
    return isValid ? null : { passwordComplexity: true };
  }

  matchPasswords(passwordKey: string, confirmPasswordKey: string) {
    return (group: AbstractControl): ValidationErrors | null => {
      const password = group.get(passwordKey)?.value;
      const confirmPassword = group.get(confirmPasswordKey)?.value;

      return password === confirmPassword ? null : { passwordsMismatch: true };
    };
  }

  submitForm() {
    if (this.registerForm.valid) {
      this.serverError = "" ;
      this.authService.Register(this.registerForm.value).subscribe(
        (res) => {
          console.log(res);
        },
        (err) => {
          console.log(err?.error?.errors);
          this.serverError = err?.error?.errors[0]?.description;
        }
      );
    } else {
      this.registerForm.markAllAsTouched();
    }
  }

  visible = true;

  constructor(
    private globalService: GlobalService,
    private authService: AuthService
  ) {}
  ngOnInit(): void {
    this.globalService.sender.subscribe((res) => {
      this.visible = res;
    });
  }
}
