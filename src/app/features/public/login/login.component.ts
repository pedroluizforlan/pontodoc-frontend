import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { HlmButtonImports } from '@spartan-ng/helm/button';
import { HlmInputImports } from '@spartan-ng/helm/input';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, HlmInputImports, HlmButtonImports],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  ngOnInit(): void {
    const token = localStorage.getItem;
    
    if(token != null){
      const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/admin';
      this.router.navigateByUrl(redirectUrl);
    }
  }

  private authService = inject(AuthService);
  private fb = inject(FormBuilder);
  private router = inject(Router);
  private route = inject(ActivatedRoute);

  errorMessage: string | null = null;
  
  loginForm = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', Validators.required]
  });

  onSubmit() {
    if (this.loginForm.valid) {
      this.errorMessage = null;
      const { email, password } = this.loginForm.value;

      this.authService.authenticate({ email: email!, password: password! }).subscribe({
        next: (token) => {
          console.log('Login bem-sucedido. Token recebido:', token);
          const redirectUrl = this.route.snapshot.queryParams['redirectUrl'] || '/admin';
          this.router.navigateByUrl(redirectUrl);
        },
        error: (err) => {
          console.error('Erro de autenticação', err);
          this.errorMessage = 'Credenciais inválidas';
        }
      });
    }
  }
}
