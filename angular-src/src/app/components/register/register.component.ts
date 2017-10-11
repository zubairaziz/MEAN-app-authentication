import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  name: String;
  username: String;
  email: String;
  password: String;

  constructor(
    private validateService: ValidateService,
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit() {
    const user = {
      name: this.name,
      username: this.username,
      email: this.email,
      password: this.password
    };

    // Required Fields
    if (!this.validateService.validateRegister(user)) {
      this.flashMessage.show('Please fill in all fields.', {cssClass: 'alert-danger', timeout: 2500});
      return false;
    }

    // Validate Email
    if (!this.validateService.validateEmail(user.email)) {
      this.flashMessage.show('Please use a valid email.', {cssClass: 'alert-danger', timeout: 2500});
      return false;
    }

    // Register User
    this.authService.registerUser(user).subscribe(data => {
    if (data.success) {
      this.flashMessage.show('You are now registered. You may now log in.', {cssClass: 'alert-success', timeout: 2500});
      this.router.navigate(['/login']);
    } else {
      this.flashMessage.show('Failed to registered.', {cssClass: 'alert-danger', timeout: 2500});
      this.router.navigate(['/register']);
    }
    });
  }

}
