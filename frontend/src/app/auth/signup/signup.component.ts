import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss'],
})
export class SignupComponent implements OnInit {
  username: string = '';
  email: string = '';
  password: string = '';
  signupSuccess: boolean = false;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {}

  signup(): void {
    this.authService.signup(this.username, this.password, this.email).subscribe(() => {
      this.signupSuccess = true;
      setTimeout(() => {
        this.router.navigate(['auth/login']);
      }, 2000); // Redirect after 2 seconds
    });
  }

  // Rest of your SignupComponent logic goes here
}
