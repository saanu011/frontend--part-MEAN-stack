import { Injectable } from '@angular/core';
import { User } from './user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { bodyparser } from 'body-parser';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  selectedUsers: User = {
    name : '',
    username : '',
    password : ''
  };

  constructor(private http: HttpClient) { }

  getUsers() {
    return this.http.get('http://localhost:3000/api/users').pipe(map(res => res));
  }

  addUsers(selectedUsers) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'application/json');
    return this.http.post('http://localhost:3000/api/signup', selectedUsers, { headers : headers}).pipe(map( res => {
        alert(JSON.stringify(res).slice(8, (JSON.stringify(res).length) - 2));
    }));
  }

  authUsers(username: String, password: String) {
    const headers = new HttpHeaders();
    headers.append('Content-Type', 'text');
    return this.http.post('http://localhost:3000/api/login', { username: username, password: password}, {headers : headers}).pipe(
      map(data => {
        if (JSON.stringify(data).slice(2, 7) === 'token') {
          alert('successful login');
          this.getUsers();
        } else {
          alert(JSON.stringify(data).slice(8, (JSON.stringify(data).length) - 2));
        }
      })
    );
  }

  deleteUser(id) {
    return this.http.delete('http://localhost:3000/api/' + id).pipe(map(res => res));
  }

}

