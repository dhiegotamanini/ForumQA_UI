import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../user.service';
import {  FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Login } from 'src/app/models/login.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {

  form!:FormGroup;
  loginModel!:Login;

  constructor(private userService: UserService, private router: Router, private fb:FormBuilder) {
    this.form = fb.group({
      username: new FormControl(''),
      password:new FormControl('')
    });
  }

  login() {
    var formValues = this.form.value;

    this.userService.login(formValues).subscribe(response => {
      this.userService.setToken(response.token);
      this.router.navigate(['/home']); 
    }, error => {
      alert('Login failed');
    });
  }

}
