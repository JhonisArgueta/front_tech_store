import { Component, inject, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth/auth-service';
import { finalize } from 'rxjs'; // 👈 Importante

@Component({
  selector: 'app-auth-component',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './auth-component.html',
  styleUrl: './auth-component.css',
})
export class AuthComponent {
  private fb = inject(FormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private cd = inject(ChangeDetectorRef); // 👈 Forzar render de vista

  showPassword: boolean = false;
  isLoginMode: boolean = true;
  isLoading: boolean = false;
  errorMessage: string | null = null;

  authForm: FormGroup = this.fb.group({
    name: [''],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]]
  });

  toggleMode(): void {
    this.isLoginMode = !this.isLoginMode;
    this.errorMessage = null;

    const nameControl = this.authForm.get('name');
    if (!this.isLoginMode) {
      nameControl?.setValidators([Validators.required, Validators.minLength(3)]);
    } else {
      nameControl?.clearValidators();
      nameControl?.setValue('');
    }
    nameControl?.updateValueAndValidity();
  }

  get nameInvalid(): boolean {
    const control = this.authForm.get('name');
    return !!(control && control.invalid && control.touched);
  }

  get emailInvalid(): boolean {
    const control = this.authForm.get('email');
    return !!(control && control.invalid && control.touched);
  }

  get passwordInvalid(): boolean {
    const control = this.authForm.get('password');
    return !!(control && control.invalid && control.touched);
  }

  onSubmit(): void {
    if (this.authForm.invalid) {
      this.authForm.markAllAsTouched();
      return;
    }

    this.isLoading = true;
    this.errorMessage = null;

    const formData = this.authForm.value;

    const request$ = this.isLoginMode 
      ? this.authService.login({ email: formData.email, password: formData.password })
      : this.authService.signUp({ name: formData.name, email: formData.email, password: formData.password });

    request$.pipe(
      // finalize se ejecuta SIEMPRE (éxito, error 409, 500, etc.)
      finalize(() => {
        this.isLoading = false;
        this.cd.detectChanges(); // Fuerza a Angular a repintar el botón
      })
    ).subscribe({
      next: (res) => {
        this.router.navigate(['/welcome']);
      },
      error: (err) => {
        console.error('Error HTTP recibido en el componente:', err);
        if (err.status === 409) {
          
          this.errorMessage = 'El correo electrónico ya está registrado.';
        } else if (err.status === 401 || err.status === 403) {
          this.errorMessage = 'Credenciales inválidas.';
        } else {
          this.errorMessage = 'Ocurrió un error al procesar la solicitud.';
        }
      }
    });
  }
}