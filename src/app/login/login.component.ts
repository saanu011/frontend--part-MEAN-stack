import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  submitted: boolean;
  user: User[] = [];
  username: String;
  password: String;
  messageForm: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({
      username : ['', Validators.required],
      password : ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  authUser() {
    this.submitted = true ;
    if (this.messageForm.invalid) {
      return;
    }
    const oldUser = {
      username : this.username,
      password : this.password
    };
    this.userService.authUsers(oldUser.username, oldUser.password).subscribe(res => res);
  }

}
