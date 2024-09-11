import { CallHandler, ExecutionContext, HttpException, HttpStatus, NestInterceptor } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { Observable } from "rxjs";

// export class taskInterceptor implements NestInterceptor {
//     intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
//       const request=context.switchToHttp().getRequest()
//       let name=request.body.name
//       console.log(request)
//        let description=request.body.description
//         if(!name||!description) {
//                 throw new HttpException('name and description should not be empty',HttpStatus.BAD_REQUEST)
//             }
//        return next()
//     }
    
// }