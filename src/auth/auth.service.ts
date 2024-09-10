import {  HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/common/DataBaseService';
import { SignUpDto } from './dto/signUp.dto';
import { LoginDto } from './dto/login.dto';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'
import { User } from 'src/common/interfaces/user.interface';
import { sendResponse } from 'src/common/response';
@Injectable()
export class AuthService {
    constructor(private dataBaseService:DataBaseService,
        private jwtService:JwtService
    ){}

    async signUp(signUpInput:SignUpDto) {
      try{
        let rows=await this.dataBaseService.runQuery('SELECT * FROM user WHERE email=? OR username=? OR phoneNumber=?'
        ,[signUpInput.email,signUpInput.userName,signUpInput.phoneNumber])
        console.log(rows)
        const result=rows[0] as User[]
        if(result.length>0) {
          throw new HttpException('there is user existed with some or all of this informations',HttpStatus.BAD_REQUEST)
        }
       const hashedPassword=await this.hashinpPassword(signUpInput.password)
      const user=await this.dataBaseService.runQuery('INSERT INTO user (email,username, phoneNumber, password) VALUES(?,?,?,?)',
            [signUpInput.email,signUpInput.userName,signUpInput.phoneNumber,hashedPassword]
        )
        return 'user is created'

      }catch(error){
        throw new HttpException(error,error.status||HttpStatus.INTERNAL_SERVER_ERROR)
      }
    }

    async login(loginInput:LoginDto){
      const rows=await this.dataBaseService.runQuery('SELECT * FROM user WHERE username=?',
        [loginInput.userName]
      )
      console.log(rows)
      const result=rows[0] as User[]
      console.log(result)
      if(result.length===0) {
        throw new HttpException('user is not Found',HttpStatus.NOT_FOUND)
      }
      const isEqual=await this.isEqualPasswords(loginInput.password,result[0].password)
      console.log(isEqual)
      if(!isEqual){
        throw new HttpException('password is not correct',HttpStatus.BAD_REQUEST)
      }
      const token=await this.createToken({userId:result[0].id,role:result[0].role})
      const response=sendResponse('',result[0])
      return {response,token}
    }

    async createToken(payload:any) {
     return  this.jwtService.sign(payload)
    }

    async verifyToken(token:string) {
      return await this.jwtService.verify(token)
    }

    async hashinpPassword(password:string) {
       return await bcrypt.hash(password,10)
    }

    async isEqualPasswords(password:string,hashedPassword:string) {
        return await bcrypt.compare(password,hashedPassword)
    }

    async findById(id:number) {
        try{
        const rows=await this.dataBaseService.runQuery('SELECT * FROM user WHERE id=?',
         [id]
        )
        console.log(rows)
        const result=rows[0] as User[]
        console.log(result)
        if(result.length===0) {
         throw new HttpException('user with this id is not Found',HttpStatus.NOT_FOUND)
        }
        return result[0]
        }catch(error){
            throw new HttpException(error,error.status||HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }
}
