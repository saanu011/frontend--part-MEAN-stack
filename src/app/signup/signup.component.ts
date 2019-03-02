import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { User } from '../user.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
  providers: [UserService]
})
export class SignupComponent implements OnInit {
  submitted: boolean;
  user: User[] = [];
  name: String;
  username: String;
  password: String;
  messageForm: FormGroup;

  constructor(private userService: UserService, private formBuilder: FormBuilder) {
    this.messageForm = this.formBuilder.group({
      name : ['', Validators.required],
      username : ['', Validators.required],
      password : ['', Validators.required]
    });
   }

  ngOnInit() {
  }

  resetForm() {
    this.userService.selectedUsers = {
      name: '',
      username : '',
      password : ''
    };
  }

  addUsers() {
    this.submitted = true ;
    if (this.messageForm.invalid) {
      return;
    }
    const newUser = {
      name : this.name,
      username : this.username,
      password : this.password
    };
    this.userService.addUsers(newUser).subscribe(data => {
      this.user.push(<any>data);
      this.resetForm();
    });
  }
}
