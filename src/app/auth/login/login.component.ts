import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  buttonLabel: string;

  constructor(public authservice: AuthServiceService, private router: Router) {
    // Set the default button label based on the current route
    this.buttonLabel = this.router.url.includes('/signup') ? 'Signup' : 'Login';
  }

  ngOnInit(): void {
    // The button label can also be set or updated here if needed
  }
  
  setButtonLabel() {
    // Adjust this logic based on how your routes are set up
    this.buttonLabel = this.router.url.includes('/signup') ? 'Signup' : 'Login';
  }

  onLogin(loginform: NgForm) {
    if (loginform.invalid) {
      // Add logic to display an error message
      return;
    }

    const username = loginform.value.enteredusername;
    const password = loginform.value.enteredpassword;

    // Determine if the current route is for login or signup
    const isLoginRoute = this.router.url.includes('/login');

    if (isLoginRoute) {
      this.authservice.login(username, password).subscribe(
        response => {
          this.authservice.saveToken(response.token); // Save the token upon successful login
          this.router.navigate(['/signup']); // Navigate to the home page upon successful login
        },
        error => {
          // Handle the login error
          // Add logic to display an error message to the user
        }
      );
    } else {
      this.authservice.signup(username, password).subscribe(
        response => {
          // Handle the signup success
          // For example, navigate to a 'check your email' page or similar
        },
        error => {
          // Handle the signup error
          // Add logic to display an error message to the user
        }
      );
    }
  }
}
