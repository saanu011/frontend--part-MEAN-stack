import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { first } from 'rxjs/operators';
import { UserService } from '../user.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
  providers: [UserService]
})
export class HomeComponent implements OnInit {
  users: User[] = [];

  constructor(private userService: UserService) { }

  ngOnInit() {
    this.loadAllUsers();
  }


  private loadAllUsers() {
    this.userService.getUsers().pipe(first()).subscribe(data => {
      this.users = <any> data;
    });
  }
  deleteUser(id: any) {
    const users = this.users;
    this.userService.deleteUser(id).subscribe(data => {

          for (let i = 0; i < users.length ; i++) {
            if (users[i]._id === id) {
              users.splice(i, 1);
            }
        }
    });
  }

}
