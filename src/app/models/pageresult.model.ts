
export interface PageResult<T>{
    items?:[any] 
        totalItems:number;
        pageIndex:number;
        totalPages:number;
        message:string;
        statusCode?:number;
}