import { CallHandler, ExecutionContext, NestInterceptor } from "@nestjs/common";
import { map, Observable, tap } from "rxjs";
import { sendResponse } from "../response";

export class responseInterceptor implements NestInterceptor {
    intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> | Promise<Observable<any>> {
      return next.handle().pipe(tap(value => console.log(value)),
       map(value => 
          sendResponse('',value)
         ));
      
    }
    
}