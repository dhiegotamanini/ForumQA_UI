import { Post } from "./post.model";

export interface Forum{
    id?:number;
    name:string;
    description:string;
    posts?:Post[];
    dateCreated:Date;
    userCreated:number;
    forumTypeId:number;
}