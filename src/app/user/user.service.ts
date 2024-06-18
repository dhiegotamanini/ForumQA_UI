import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Login } from '../models/login.model';
import { User } from '../models/user.model';
import { PageResult } from '../models/pageresult.model';
import { ForumQAResult } from '../models/forumqaresult.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private apiUrl = 'http://localhost:5000/api/v1/'; 

  constructor(private http: HttpClient) { }


  login(login:Login): Observable<any> {
    console.log('url ' + this.apiUrl + 'login');
    return this.http.post<any>(`${this.apiUrl}login`, login);
  }

  logout() {
    localStorage.removeItem('token');
  }

  setToken(token: string) {
    localStorage.setItem('token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('token');
  }

  isLoggedIn(): boolean {
    return this.getToken() !== null;
  }


  getUsers():Observable<PageResult<User[]>>{
    let userUrl = this.apiUrl + 'users';
    return this.http.get<PageResult<User[]>>(userUrl);
  }

  getUser(id:number):Observable<ForumQAResult<User>>{
    let userUrl = this.apiUrl + 'users/'+id;
    return this.http.get<ForumQAResult<User>>(userUrl);
  }

  

  saveUser(user:User, file: File | null):Observable<boolean>{
    
    const formData = new FormData();
    formData.append('user', JSON.stringify(user));
    if (file) {
      formData.append('photo', file, file.name);
    }

    if(user.userId > 0 && user.userId != null && user.userId != undefined){
      return this.updateUser(formData);
    }

    return this.addUser(formData);

  }


  getUserPicture(photoName: string): Observable<Blob> {
    const userUrl = `${this.apiUrl}users/${photoName}/picture`; 
    return this.http.get(userUrl, {
      responseType: 'blob', 
      observe: 'response' 
    }).pipe( map(response => response.body as Blob) );
  }


  updateUser(userFormData:FormData):Observable<boolean>{
    const userUrl = `${this.apiUrl}users-update`;
    return this.http.post<boolean>(userUrl, userFormData);
  }

  addUser(userFormData:FormData):Observable<boolean>{
    let userUrl = this.apiUrl +'add-users';
    return this.http.post<boolean>(userUrl, userFormData);
  }


  deleteUser(id:number):Observable<boolean>{
    let userUrl = this.apiUrl + 'users/'+id;
    return this.http.delete<boolean>(userUrl);
  }

  /*
   saveUser(user:User):Observable<boolean>{
    if(user.userId != 0 && user.userId != null && user.userId != undefined){
      return this.updateUser(user, user.userId );
    }

    return this.addUser(user);
   }

   addUser(user:User):Observable<boolean>{
    let userUrl = this.apiUrl +'users';
    return this.http.post<boolean>(userUrl, user);
   }

   updateUser(user:User, id:number):Observable<boolean>{
    let userUrl = this.apiUrl + 'users/'+id;
    return this.http.put<boolean>(userUrl, user);
   }

  */

}
