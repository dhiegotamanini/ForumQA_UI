import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ForumsComponent } from './forums/forums/forums.component';
import { ForumComponent } from './forums/forum/forum.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { ForumService } from './forums/forum.service';
import { AnswerPostComponent } from './forums/answer-post/answer-post.component';
import {  ReactiveFormsModule } from '@angular/forms';
import { SpinnerComponent } from './shared/spinner/spinner.component';
import { AddQuestionComponent } from './forums/add-question/add-question.component';
import { ForumTypeComponent } from './forumtype/forum-type/forum-type.component';
import { AddForumTypeComponent } from './forumtype/add-forum-type/add-forum-type.component';
import { LoginComponent } from './user/auth/login/login.component';
import { UserService } from './user/user.service';
import { AuthInterceptor } from './user/auth/auth.interceptor';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './user/users/users.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { NewUserComponent } from './user/new-user/new-user.component';
import { UserFormComponent } from './user/user-form/user-form.component';
import { SafeUrlPipe } from './shared/safeurlpipe';

@NgModule({
  declarations: [
    AppComponent,
    ForumsComponent,
    ForumComponent,
    AnswerPostComponent,
    SpinnerComponent,
    AddQuestionComponent,
    ForumTypeComponent,
    AddForumTypeComponent,
    LoginComponent,
    HomeComponent,
    UsersComponent,
    EditUserComponent,
    NewUserComponent,
    UserFormComponent,
    SafeUrlPipe
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule
    
  ],
  providers: [ ForumService , 
    UserService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }],
  bootstrap: [AppComponent]
})
export class AppModule { }
