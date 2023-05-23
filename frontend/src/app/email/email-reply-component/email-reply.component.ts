import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { EmailService } from '../email.service';
import { Email } from '../email.interface';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.scss'],
})
export class EmailReplyComponent implements OnInit {
  email: Email = {
    id: '',
    from: '',
    to: '',
    subject: '',
    body: '',
    timestamp: '',
    replies: [],
  };
  reply = '';

  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.emailService.getEmail(id).subscribe((email) => {
        this.email = email;
      });
    }
  }

  sendReply() {
    const user = localStorage.getItem('username');
    if (!user) {
      alert('Please sign up or log in before replying');
      // redirect to signup or login page
      return;
    }
    if (this.email) {
      this.emailService
        .replyToEmail(this.email.id, this.reply, user)
        .subscribe({
          next: () => {
            alert('Reply sent!');
            this.reply = '';
          },
          error: (error) => {
            console.log('Reply send failed');
            alert(error.error.message); // Display error message
          },
        });
    }
  }
}
