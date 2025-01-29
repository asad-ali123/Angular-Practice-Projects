import { Component } from '@angular/core';
import { UserService } from '../Services/user.service';
import { User } from '../Models/User';

@Component({
  selector: 'app-users',
  imports: [],
  templateUrl: './users.component.html',
  styleUrl: './users.component.css'
})
export class UsersComponent {
  constructor(private userService: UserService) {

  }

  users: User[] = [];

  ngOnInit() {
    this.users = this.userService.users;
  }
}
