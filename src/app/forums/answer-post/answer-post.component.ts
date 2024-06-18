import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AnswerPost } from 'src/app/models/answerpost.model';
import { ForumService } from '../forum.service';
import { ForumType } from 'src/app/enums/forumtype.enum';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-answer-post',
  templateUrl: './answer-post.component.html',
  styleUrls: ['./answer-post.component.css']
})
export class AnswerPostComponent implements OnInit {

  forumId?:number = 0;
  postId:number = 0;
  answerPost?:AnswerPost[];  
  forumTypeName: string = '';
  question:string = '';
  isSetAddComment: boolean = false;
  form:FormGroup;
  isLoading:boolean = false;
  imageSize = 85;
  imagePadding = 2;

  constructor(private service:ForumService  ,private activedRoute:ActivatedRoute,private route:Router , private fb:FormBuilder){
    this.form = this.fb.group({
      answer: new FormControl(''),
      postId: new FormControl(this.postId),
      userId: new FormControl(1)
      
    });
  }

  loadForm(){
    
  }

  ngOnInit(): void {
    const data = history.state.post;
    this.question = data?.description;
    this.activedRoute.paramMap.subscribe( (param) => {       
      this.postId  = Number( param.get('idPost') );
      this.forumId = Number( data.forumId);

      this.form.get('postId')?.setValue(this.postId);
        this.getAnswersPost(data.id);        
    }); 
  }

  getAnswersPost(idForumType: number){
    this.service.getAnswersPost(this.postId).subscribe( (answersPost) => {
      this.answerPost = answersPost.items;  
      this.forumTypeName = ForumType[idForumType]    
      
    } );
  }
  

  onBack():void{
    this.route.navigate(['/forums/' + this.forumId  ]);
  }

  onAddComment():void{
    this.isSetAddComment = !this.isSetAddComment;
  }

  onCancel():void{
    this.isSetAddComment = !this.isSetAddComment;
  }

  onSubmit():void{
    let formValue = this.form.value;
    this.isLoading = true;
    this.service.addAnswerPost(formValue)
    .subscribe( (result) => {
      this.isLoading = false;
      if(result == true)
      {
        this.getAnswersPost(this.postId);  
        this.cleanTextArea();
        this.onAddComment();
      }
    });
  }

  cleanTextArea():void {
    this.form.reset();
  }

  getPhotoUrl(photoPath: string): string {
    return `assets/${photoPath}`;
  }

}
