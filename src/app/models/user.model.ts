export interface User{
    userId:number;
    name:string;
    userName:string;
    userPhoto:string;
    photoFileName:string;
    userPassword?:string;
    memberSince:Date;
    password:string;
    userPhotoFile:File;
    userPhotoBytes:Uint8Array ;
}