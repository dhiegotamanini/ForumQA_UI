import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ForumService } from '../forum.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumType } from 'src/app/enums/forumtype.enum';

@Component({
  selector: 'app-add-question',
  templateUrl: './add-question.component.html',
  styleUrls: ['./add-question.component.css']
})
export class AddQuestionComponent implements OnInit {

  forumId?:number = 0;
  forumTypeName: string = '';
  question:string = '';
  
  form:FormGroup;
  isLoading:boolean = false;


  constructor(private service:ForumService  ,private activedRoute:ActivatedRoute,private route:Router , private fb:FormBuilder){
    this.form = this.fb.group({
      title: new FormControl(''),
      description: new FormControl(''),
      forumId: new FormControl(0),
      userId: new FormControl(1)
      
    });
  }
  ngOnInit(): void {
    this.activedRoute.paramMap.subscribe( (param) => {
      this.forumId = Number(param.get('idForum')?.toString());
      this.form.get('forumId')?.setValue(this.forumId);
      this.forumTypeName = ForumType[this.forumId];
    } );
  }

  onBack():void{
    this.route.navigate(['/forums/' + this.forumId  ]);
  }

  onSubmit():void{
    let formValue = this.form.value;
    this.isLoading = true;
    this.service.addPost(formValue)
    .subscribe( (result) => {
      this.isLoading = false;
      if(result == true)
      {
        this.cleanTextArea();
        this.onBack();        
      }
    });
  }

  cleanTextArea():void{
    this.form.reset();
  }

}
