import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { EmailService } from "../email.service";
import { Email } from "../email.interface";
import { AuthService } from "src/app/auth/auth.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-email-reply",
  templateUrl: "./email-reply.component.html",
  styleUrls: ["./email-reply.component.scss"],
})
export class EmailReplyComponent implements OnInit {
  email: Email = {
    id: "",
    from: "",
    to: "",
    subject: "",
    body: "",
    timestamp: "",
    replies: [],
  };
  reply = "";

  constructor(
    private route: ActivatedRoute,
    private emailService: EmailService,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.paramMap.get("id");
    if (id) {
      this.emailService.getEmail(id).subscribe(
        (email) => {
          this.email = email;
        },
        (error) => {
          console.error("Error fetching email:", error);
        }
      );
    }
  }

  sendReply(): void {
    if (this.email) {
      const username = this.authService.currentUserValue;
      if (username) {
        this.emailService
          .replyToEmail(this.email.id, this.reply, username)
          .subscribe(() => {
            alert("Reply sent");
            this.router.navigate(["emails"]);
          });
      }
    }
  }
}
