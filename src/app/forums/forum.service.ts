import { AnswerPost } from './../models/answerpost.model';
import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Forum } from '../models/forum.model';
import { PageResult } from '../models/pageresult.model';
import { Post } from '../models/post.model';
import { ForumType } from '../models/forumtype.models';

@Injectable({
  providedIn: 'root'
})
export class ForumService {

  private apiUrl:string = 'http://localhost:5000/api/v1/';
  constructor(private httpClient:HttpClient) { }

  getForums():Observable<Forum[]>{
    let forumsUrl = this.apiUrl + 'forums';
    return this.httpClient.get<Forum[]>(forumsUrl);
  }

  getForumsTest():Observable<PageResult<Forum[]>>{
    let forumsUrl = this.apiUrl + 'forums';
    return this.httpClient.get< PageResult<Forum[]>>(forumsUrl);
  }

  updateForum(id:number, forum:Forum):Observable<boolean>{
    let forumUrl = this.apiUrl + 'forums/' + id;
    return this.httpClient.put<boolean>(forumUrl ,   forum);
  }

  deleteForum(id:number):Observable<boolean>{
    let forumUrl = this.apiUrl + 'forums/' +id;
    return this.httpClient.delete<boolean>(forumUrl);
  }

  getPost(id:number):Observable<PageResult<Post[]>>{
    let postUrl = this.apiUrl + 'posts/' +id;
    return this.httpClient.get< PageResult<Post[]>>(postUrl);
  }

  getAnswersPost(postId:number):Observable<PageResult<AnswerPost[]>>{
    let answerPostUrl = this.apiUrl + 'answers-post/' + postId;
    return this.httpClient.get< PageResult<AnswerPost[]>>(answerPostUrl);
  }

  addAnswerPost(answerPost:AnswerPost):Observable<boolean> {
    let answerPostUrl = this.apiUrl + 'answers-post';
    return this.httpClient.post<boolean>(answerPostUrl , answerPost);
  }

  addPost(post: Post):Observable<boolean>{
    let postUrl = this.apiUrl + 'add-post';
    return this.httpClient.post<boolean>(postUrl, post);
  }

  saveForum(forum:Forum):Observable<boolean>{
    if(forum.id != 0 && forum.id != null && forum.id != undefined){
      return this.updateForum(forum.id, forum);
    }

    return this.addForum(forum);
  }

  addForum(forum: Forum):Observable<boolean>{
    let forumUrl = this.apiUrl + 'forums';
    return this.httpClient.post<boolean>(forumUrl, forum);
  }

  getForumsType():Observable<PageResult<ForumType[]>>{
    let forumTypeUrl = this.apiUrl + 'forum-types';
    return this.httpClient.get<PageResult<ForumType[]>>(forumTypeUrl);
  }

  getForumType(id:number):Observable<ForumType>{
    let forumTypeUrl = this.apiUrl + 'forum-types/'+id;
    return this.httpClient.get<ForumType>(forumTypeUrl);
  }

  saveForumType(forumType:ForumType):Observable<PageResult<ForumType>>{
    if(forumType.id != 0 && forumType.id != null && forumType.id != undefined){
      return this.updateForumType(forumType.id, forumType);
    }

    return  this.addForumType(forumType);
  }

  addForumType(forumType:ForumType):Observable<PageResult<ForumType>>{
    let forumTypeUrl = this.apiUrl + 'forum-types';
    console.log('url here ' + forumTypeUrl);
    return this.httpClient.post<PageResult<ForumType>>(forumTypeUrl , forumType );
  }

  updateForumType(id:number, forumType:ForumType):Observable<PageResult<ForumType>>{
    let forumTypeUrl = this.apiUrl + 'forum-types/' + id;
    return this.httpClient.put<PageResult<ForumType>>(forumTypeUrl ,   forumType);
  }

  deleteForumType(id:number):Observable<PageResult<ForumType>>{
    let forumTypeUrl = this.apiUrl + 'forum-types/' +id;
    return this.httpClient.delete< PageResult<ForumType>>(forumTypeUrl);
  }

}
