import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './auth/signup/signup.component';
import { LoginComponent } from './auth/login/login.component';
import { EmailComponent } from './email/email-component/email.component';
import { EmailReplyComponent } from './email/email-reply-component/email-reply.component';
import { EmailCreateComponent } from './email/email-create-component/email-create.component';

const routes: Routes = [
  { path: 'auth/login', component: LoginComponent },
  { path: 'auth/signup', component: SignupComponent },
  { path: 'emails', component: EmailComponent },
  { path: 'emails/create', component: EmailCreateComponent },
  { path: 'emails/:id', component: EmailReplyComponent },
  { path: '', redirectTo: 'emails', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
