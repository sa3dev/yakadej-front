import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OtherService } from 'src/app/services/other/other.service';

@Component({
  selector: 'app-newsletter',
  templateUrl: './newsletter.component.html',
  styleUrls: ['./newsletter.component.css']
})
export class NewsletterComponent {

  successMessage: boolean;

  newletterForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email])
  });

  constructor(private otherService: OtherService) { }

  onSubmit() {
    if (this.newletterForm.valid) {
      const mailForNewsletter = (this.newletterForm.get('email').value);
      this.otherService.registerToNewsletter(mailForNewsletter).subscribe(
        () => {
          this.newletterForm.reset();
          this.successMessage = true;
        }
      );
    }

  }
}
