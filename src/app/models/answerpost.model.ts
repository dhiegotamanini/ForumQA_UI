import { User } from "./user.model";

export interface AnswerPost{
    id:number;
    answer:string;
    answerDate:Date;
    user:User;
    userId:number;
    postId:number;
}