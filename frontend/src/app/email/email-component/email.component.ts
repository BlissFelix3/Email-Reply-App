import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';
import { Email } from '../email.interface';

@Component({
  selector: 'app-emails',
  templateUrl: './email.component.html',
  styleUrls: ['./email.component.scss'],
})
export class EmailComponent implements OnInit {
  emails: Email[] = [];

  constructor(private emailService: EmailService) {}

  ngOnInit() {
    this.emailService.getEmails().subscribe((emails) => {
      this.emails = emails;
    });
  }
}
