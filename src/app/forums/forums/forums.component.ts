import { Forum } from 'src/app/models/forum.model';
import { ForumService } from './../forum.service';
import { Component, OnInit } from '@angular/core';
import { PageResult } from 'src/app/models/pageresult.model';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { ForumType } from 'src/app/models/forumtype.models';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-forums',
  templateUrl: './forums.component.html',
  styleUrls: ['./forums.component.css']
})
export class ForumsComponent implements OnInit {
  isAddForum:boolean = false; 
  forums:Forum[] = [];
  forumsTest?:PageResult<Forum[]>;
  form!: FormGroup;
  forumsTypes!:PageResult<ForumType[]>;
  forumSelected?:Forum;
  message:string = '';
  isSubmitedForm:boolean = false;
  isLoading:boolean = false;

  constructor(private service:ForumService, private fb:FormBuilder){
    this.form = this.fb.group({
      id: new FormControl(0),
     name: new FormControl(null, Validators.required),
     description: new FormControl('', Validators.required),
     userCreated: new FormControl(1),
     forumTypeId: [0, Validators.required , this.greaterThanZeroValidator]
    });
  }

   ngOnInit(): void {
    this.message = '';
    this.isLoading = true;
    this.getForums();
    this.getForumsTypes();
    this.isSubmitedForm = false;
   }

   getForums(){
    this.service. getForumsTest().subscribe( (result) => {
      this.forumsTest = result;
      this.isLoading = false;
    }, error =>{
      this.isLoading = false;
      this.message = 'Error when tried get information. ' +error.message;
    });
   }

   getForumsTypes(){
    this.service.getForumsType().subscribe(forumTypes => {
      this.forumsTypes = forumTypes;
      this.isLoading = false;
    })
   }

   onAddForum():void{
    this.message = '';
    this.isAddForum = !this.isAddForum;
   }

   onSubmit():void{
    this.isLoading = true;
    this.isSubmitedForm = true;
      let forum = this.form.value;
      forum.userCreated = forum.userCreated ?? 1;
      if(this.form.valid){
        this.service.saveForum(forum).subscribe( (result) => {
          if(result == true)  {
            this.cleanTextArea();
            this.getForums();
            this.onCancel();
          }
          this.isLoading = false;
        });
      }
      else{
        this.isLoading = false;
        this.form.markAllAsTouched();
      }           

   }

   onCancel():void{
    this.isAddForum = !this.isAddForum;
   }

   cleanTextArea():void{
    this.form.reset();
  }

  onEdit(forum:Forum){
    this.message = '';
    this.isAddForum = true;
    this.form.get('name')?.patchValue(forum.name);
    this.form.get('id')?.patchValue(forum.id);
    this.form.get('description')?.patchValue(forum.description);
    this.form.get('forumTypeId')?.patchValue(forum.forumTypeId);
    
   }

   onDelete(forum:Forum){
    this.forumSelected = forum;
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
    if(this.forumSelected != null && this.forumSelected != undefined){
      this.isLoading = true;
      this.service.deleteForum(this.forumSelected.id!).subscribe(item => {
        this.message = 'Forum has been removed successful.'   
        this.closeModal(); 
        this.isAddForum = false;
        this.getForums();
        this.isLoading = false;
      });
    }
    else{
      this.message = 'Error when tried delete item. Please, try again.'
      this.isAddForum = false;
      this.closeModal(); 
      this.isLoading = false;
    }

   }

   greaterThanZeroValidator(control: FormControl):Observable<any> {
    const value = control.value;
    if (value > 0) {
      return of(null);
    } else {
      return of(true) ;
    }
  }


}
