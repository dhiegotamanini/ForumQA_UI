import { ForumService } from './../forum.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PageResult } from 'src/app/models/pageresult.model';
import { Post } from 'src/app/models/post.model';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  forumId:number = 0;
  posts?:PageResult<Post[]>;
  isLoading:boolean = false;

  constructor(private route:Router, private activedRouter: ActivatedRoute, private service:ForumService ){
    this.activedRouter. paramMap.subscribe( (param) => {
      this.forumId = Number(param.get('id'))
    });
  }

  ngOnInit(): void {
    this.isLoading = true;  
    this.service.getPost(this.forumId).subscribe( (posts) => {
      this.posts = posts;
      this.isLoading = false;
    });
  }

  onBack():void{
   this.route.navigate(['/forums']);
  }

  onAddQuestion():void{
    this.route.navigate(['/add-question', this.forumId ]);
  }

}
