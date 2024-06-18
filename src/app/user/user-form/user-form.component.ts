import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { UserService } from '../user.service';
import { ActivatedRoute, Router } from '@angular/router';
import { ForumQAResult } from 'src/app/models/forumqaresult.model';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.css']
})
export class UserFormComponent implements OnInit {
  user:User | undefined;
  idUser:number = 0;
  isLoading:boolean = false;
  form!:FormGroup;
  message:string = '';
  imageUrl?: string | ArrayBuffer | null = null;
  selectedFile: File | null = null;
  fileBytes: string | null = null; 
  userPhotoPath:string = '';

  
  constructor(private service:UserService,  private activatedRoute:ActivatedRoute, private route:Router, private fb:FormBuilder ) {
    activatedRoute.paramMap.subscribe(param => {
      this.idUser = param.get('id') != null && param.get('id') != undefined ? Number(param.get('id') ) : 0;
    });
  }


  ngOnInit(): void {
    
    if(this.idUser != 0)   {
      this.service.getUser(this.idUser).subscribe(  (result: ForumQAResult<User>)  => {
        this.user = result.data;
        if(this.user.userPhoto != undefined && this.user.userPhoto != null && this.user.userPhoto != '')
        {
          let photoName = '';
          let startNameImage = this.user.userPhoto.indexOf("\\");
          if(startNameImage > -1 ){
            startNameImage +=1;
            photoName = this.user.userPhoto.substring(startNameImage , this.user.userPhoto.length  )
          }

          this.loadPicture(photoName);

        }
        
        this.buildForm();
      }, error => {
        this.message = error.message;
        console.log('error ' + error.message);
      });
    }
      
    this.buildForm();

   }


   loadPicture(photoName:string){
    this.service.getUserPicture(photoName).subscribe(blob => {
      this.userPhotoPath = URL.createObjectURL(blob);
    });
   }


  buildForm(){
    this.form = this.fb.group({
      userId: new FormControl(this.user?.userId),
      name: new FormControl(this.user?.name),
      userName: new FormControl(this.user?.userName),
      userPassword: new FormControl(this.user?.userPassword),
      userPhoto: new FormControl(this.user?.userPhoto),
    });
  }

  save(){

    if(this.form.valid){
      let user = this.form.value;
      this.isLoading = true;
      user.userId = user.userId ?? 0;
      user.userPhotoBytes = this.fileBytes;

      this.service.saveUser(user, this.selectedFile).subscribe(result => {
        if(result == true){
          this.isLoading = false;
          this.route.navigate(['users']);
        }
        else{
          this.message = 'Something was wrong when user tried edit. Please, try again'
        }
      });
    }

  }

  cancel(){
    this.route.navigate(['users']);
  }


  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      this.selectedFile = input.files[0];

      const reader = new FileReader();
      reader.onload = (e) => {
        this.imageUrl = e.target?.result;
      };
      reader.readAsDataURL(this.selectedFile);
    }
  }

}
