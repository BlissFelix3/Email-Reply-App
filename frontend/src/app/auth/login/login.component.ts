import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  errorMessage: string = '';

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  login(event: Event): void {
    event.preventDefault();
    this.authService.login(this.email, this.password).subscribe({
      next: (response) => {
        console.log('Login Successful');
        console.log(response); // add this line
        localStorage.setItem('username', response.username);
        this.router.navigate(['emails']); // Redirect to email component
        this.errorMessage = '';
      },
      error: (error) => {
        console.log('Login Failed');
        this.errorMessage = error.error.message;
      },
    });
  }
}
