import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';
import { Router } from '@angular/router';
import { PageResult } from 'src/app/models/pageresult.model';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
   
   users?:PageResult<User[]> ;
   userSelected?:User;
   message:string = '';
   isLoading:boolean = false;
   hasError:boolean = false;

   
   constructor(private service:UserService, private router:Router) {
    
   }

   ngOnInit(): void {
    this.getUsers();    
  }

  getUsers(){
    this.service.getUsers().subscribe(result => {
      this.users = result;
    }, error => {
      console.log('Error');
    });
  }

  onEdit(id:number){
     if(id != 0){
      this.router.navigate(['/users' , id]);
     }
  }

  onDelete(user:User){
    this.userSelected = user;
    this.openModal();
  }


  openModal(){
    const modalDiv = document.getElementById('modal')
    if(modalDiv != null){
      modalDiv.style.display = 'block';
    }
   }   

   closeModal(){
    const modalDiv = document.getElementById('modal')
    if(modalDiv != null){
      modalDiv.style.display = 'none';
    }
   }

   confirmDelete(){
    if(this.userSelected != null && this.userSelected != undefined){
     this.isLoading = true;

      this.service.deleteUser(this.userSelected.userId).subscribe(result => {
        this.setSucessfullMessage('Forum type has been removed');        
        this.closeModal(); 
        this.getUsers();
        this.isLoading = false;

      } , error => {
          this.closeModal(); 
          this.hasError = true;
          this.message = 'Error when tried delete item. ' + error.message;
          this.isLoading = false;
      });
    }    

   }


   addUser(){
    this.router.navigate(['/new-user']);
   }

   setSucessfullMessage(message:string){
    this.message = message;
    setTimeout(() => {
      this.message = '';
    }, 5000);

   }


}
