import { Component, OnInit } from '@angular/core';
import { UserService } from '../user.service';
import { ActivatedRoute, Route, Router } from '@angular/router';
import { User } from 'src/app/models/user.model';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ForumQAResult } from 'src/app/models/forumqaresult.model';

@Component({
  selector: 'app-edit-user',
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css']
})
export class EditUserComponent  {
  isLoading:boolean = false;
  message:string = '';
 
  

}
