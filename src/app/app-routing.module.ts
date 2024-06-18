import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ForumsComponent } from './forums/forums/forums.component';
import { ForumComponent } from './forums/forum/forum.component';
import { AppComponent } from './app.component';
import { AnswerPostComponent } from './forums/answer-post/answer-post.component';
import { AddQuestionComponent } from './forums/add-question/add-question.component';
import { ForumTypeComponent } from './forumtype/forum-type/forum-type.component';
import { LoginComponent } from './user/auth/login/login.component';
import { HomeComponent } from './home/home.component';
import { UsersComponent } from './user/users/users.component';
import { EditUserComponent } from './user/edit-user/edit-user.component';
import { NewUserComponent } from './user/new-user/new-user.component';

const routes: Routes = [
  { path: 'forums' , component:ForumsComponent },
  { path:'forums/:id', component:ForumComponent },
  { path : 'forum-type' , component:ForumTypeComponent},
  { path:'answer-post/:idPost' , component:AnswerPostComponent },
  { path:'add-question/:idForum' , component: AddQuestionComponent},
  { path: 'login', component: LoginComponent},
  { path: 'home' , component:HomeComponent},
  { path: 'users', component:UsersComponent },
  { path: 'users/:id', component:EditUserComponent },
  { path: 'new-user' , component:NewUserComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
