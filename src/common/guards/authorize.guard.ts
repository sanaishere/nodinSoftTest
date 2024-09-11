import { CanActivate, ExecutionContext, HttpException, HttpStatus, Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class AdminGuard implements CanActivate {
    constructor(){}
    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
            let req=context.switchToHttp().getRequest()
            let role:String=req.user.role
            if(role!=='admin'){
             throw new HttpException('you should be admin to do this',HttpStatus.FORBIDDEN)
            }
            return true
        }
    }
