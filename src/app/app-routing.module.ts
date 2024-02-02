import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';
import { IssueCreateComponent } from './issue/issue-create/issue-create.component';
import { IssueDisplayComponent } from './issue/issue-display/issue-display.component';

// Import MatSnackBarModule and MatInputModule
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatInputModule } from '@angular/material/input';

const routes: Routes = [
  { path: '', component: IssueDisplayComponent },
  { path: 'add', component: IssueCreateComponent },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: LoginComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes),
    // Add MatSnackBarModule and MatInputModule to the imports array
    MatSnackBarModule,
    MatInputModule,
    // ... other modules
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
