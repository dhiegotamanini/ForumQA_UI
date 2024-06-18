import { ForumService } from './../../forums/forum.service';
import { ForumType } from 'src/app/models/forumtype.models';
import { PageResult } from 'src/app/models/pageresult.model';

import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-forum-type',
  templateUrl: './forum-type.component.html',
  styleUrls: ['./forum-type.component.css']
})
export class ForumTypeComponent implements OnInit {
   
  forumsType!:PageResult<ForumType[]>;
  form!:FormGroup
  isAddForumType:boolean = false;
  message:string = '';
  hasError:boolean = false;
  forumTypeSelected?:ForumType;
  isLoading:boolean = false;
  


   constructor(private service:ForumService, private fb:FormBuilder) {
    this.form = this.fb.group({
      name: new FormControl(''),
      userCreated: new FormControl(1),
      id: new FormControl()
    });

   }

   ngOnInit(): void {
     this.getForumsType();
     this.message = '';
     this.hasError = false;
   } 

   getForumsType(){
    this.isLoading = true;
      this.service.getForumsType().subscribe(f =>{
        this.forumsType = f;
        this.isLoading = false;
      }, error => {
        this.isLoading = false;
        this.hasError = true;
        this.message = 'Error when tried get information. ' +error.message;
      });
   }

   onAddForumType(){
    this.form.get('name')?.patchValue('');
    this.form.get('id')?.patchValue(0);
    this.isAddForumType = !this.isAddForumType;    
   }

   onSubmit(){
    let formForumType = this.form.value;
    this.isLoading = true;
    this.service.saveForumType(formForumType).subscribe(result => {
        this.setSucessfullMessage( 'Forum type has been saved successfully');
        this.isAddForumType = false;
        this.getForumsType();
        this.isLoading = false;

     }, error => {
      this.hasError = true;
      this.message = 'Error when tried created forum type. Error ' + error;
      this.isLoading = false;

     }
      
     );

   }

   onEdit(forumType:ForumType){
    this.isAddForumType = true;
    this.message = '';
    this.hasError = false;
    this.form.get('name')?.patchValue(forumType.name);
    this.form.get('id')?.patchValue(forumType.id);
    
   }

   onDelete(forumType:ForumType){
    this.forumTypeSelected = forumType;
    this.openModal();
   }

   onCancel(){
    this.isAddForumType = !this.isAddForumType;
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
    if(this.forumTypeSelected != null && this.forumTypeSelected != undefined){
     this.isLoading = true;

      this.service.deleteForumType(this.forumTypeSelected.id).subscribe(result => {
        this.setSucessfullMessage('Forum type has been removed');        
        this.closeModal(); 
        this.isAddForumType = false;
        this.getForumsType();
        this.isLoading = false;

      } , error => {
          this.closeModal(); 
          this.hasError = true;
          this.message = 'Error when tried delete item. ' + error.message;
          this.isLoading = false;
      });
    }    

   }

   setSucessfullMessage(message:string){
    this.message = message;
    setTimeout(() => {
      this.message = '';
    }, 5000);

   }

   
}
