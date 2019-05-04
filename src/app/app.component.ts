import { Component } from '@angular/core';
import { AuthService } from './Services/auth.service';
import { User } from './models/user';
import { Router } from '@angular/router';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'dcoder-challenge';
  currentUser: User;

    constructor(
        private router: Router,
        private auth: AuthService
    ) {
        this.auth.currentUser.subscribe(x => this.currentUser = x);
    }

    logout() {
        this.auth.logout();
        this.router.navigate(['/users/login']);
    }
}
