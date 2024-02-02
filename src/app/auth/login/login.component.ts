import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';
import { MatSnackBar } from '@angular/material/snack-bar'; 

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  buttonLabel: string;

  constructor(public authservice: AuthServiceService, private router: Router, private snackBar: MatSnackBar) {
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
      this.snackBar.open('Please fill in all required fields.', 'Dismiss', {
        duration: 3000, // Display for 3 seconds
      });
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
          this.router.navigate(['/add']); // Navigate to the home page upon successful login

          // Display a success message using MatSnackBar
          this.snackBar.open('Login successful!', 'Dismiss', {
            duration: 3000, // Display for 3 seconds
          });
        },
        error => {
          // Handle the login error
          this.snackBar.open('Login failed. Please check your credentials.', 'Dismiss', {
            duration: 3000, // Display for 3 seconds
          });
        }
      );
    } else {
      this.authservice.signup(username, password).subscribe(
        response => {
          // Handle the signup success
          // For example, navigate to a 'check your email' page or similar

          // Display a success message using MatSnackBar
          this.snackBar.open('Signup successful!', 'Dismiss', {
            duration: 3000, // Display for 3 seconds
          });
           // Redirect to the login page after successful signup
      this.router.navigate(['/login']);
        },
        error => {
          // Handle the signup error
          this.snackBar.open('Signup failed. Please try again later.', 'Dismiss', {
            duration: 3000, // Display for 3 seconds
          });
        }
      );
    }
  }
  
  onSignOut() {
    // Call the logout method from AuthServiceService to clear the user's token
    this.authservice.logout();

    // Redirect to the login page
    this.router.navigate(['/login']); // Change this to the correct route for your login page

    // Display a sign-out message using MatSnackBar
    this.snackBar.open('You have been signed out.', 'Dismiss', {
      duration: 3000, // Display for 3 seconds
    });
  }
}
