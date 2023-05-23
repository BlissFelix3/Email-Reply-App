import { Component } from "@angular/core";
import { EmailService } from "../email.service";
import { Email } from "../email.interface";
import { Router } from "@angular/router";

@Component({
  selector: "app-email-create",
  templateUrl: "./email-create.component.html",
  styleUrls: ["./email-create.component.scss"],
})
export class EmailCreateComponent {
  email: Partial<Email> = { to: "", from: "", subject: "", body: "" };

  constructor(private emailService: EmailService, private route: Router) {}

  sendEmail() {
    const user = localStorage.getItem("username");
    if (!user) {
      alert("Please sign up or log in before sending an email");
      return;
    }
    this.emailService.createEmail(this.email, user).subscribe({
      next: (response) => {
        alert("Email sent!");
        this.email = { to: "", from: "", subject: "", body: "" };
        this.route.navigate(["emails"]);
      },
      error: (error) => {
        console.log("Email send failed");
        alert(error.error.message); 
      },
    });
  }
}
