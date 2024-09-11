import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/common/DataBaseService';
import { EditProfileDto } from './dto/editProfile.dto';
import { IUser } from 'src/common/interfaces/user.interface';
import { sendResponse } from 'src/common/response';
import { ChangeInformationDto } from './dto/changeInformation';
import { AssignRoleDto } from './dto/assignRole.dto';
import { Base_Url } from 'src/common/url';
import { QueryDto } from 'src/common/dto/query.dto';
import { pagination } from 'src/common/pagination';

@Injectable()
export class UserService {
   constructor(private dataBaseService:DataBaseService){}
   async uploadProfile(fileName:string,user:IUser) {
     const url=`${Base_Url}/user/image/${fileName}`
     await this.dataBaseService.runQuery('UPDATE user set imageUrl=? WHERE id=?',[url,user.id])
     return {message:'image is uploaded',url}
   }

   async editMyProfile(editProfileInput:EditProfileDto,user:IUser) {
    await this.findById(user.id)
    const fields=[]
    const values=[]
    try{
      for (const [key, value] of Object.entries(editProfileInput)) {
          fields.push(`${key} = ?`);
          values.push(value);
      }
      values.push(user.id)
      await this.dataBaseService.runQuery(`UPDATE user SET ${fields.join(' ,')} WHERE id=?`,values)
      return `your profile is updated successfully`
    }catch(error) {
      throw new HttpException(error,error.status)
    }
   }

   async getAllUsers(apiQuery:QueryDto) {
    let page=apiQuery.page?apiQuery.page:1
      let limit=apiQuery.limit?apiQuery.limit:5
      let conditionsQuery=''
      let values=[]
      if(apiQuery.text) {
        conditionsQuery=` WHERE email LIKE ? OR username LIKE ? OR phoneNumber LIKE ? OR role LIKE ?`
        values.push(`${apiQuery.text}%`,`${apiQuery.text}%`,
        `${apiQuery.text}%`,`${apiQuery.text}%`)
      }

      let query=`SELECT * FROM user ${conditionsQuery}`
      if(apiQuery.sortBy) {
        let orderBy=apiQuery.orderBy?apiQuery.orderBy:''
        query += ` ORDER BY ${apiQuery.sortBy} ${orderBy}`;
      }
      console.log(values)
      const queryResult= await this.dataBaseService.
      runQuery(query,values)

      let users=queryResult[0] as IUser[]
      let usersInPage=pagination<IUser>(users,page,limit,`${Base_Url}/user/allUsers`)
      return usersInPage
   }

   async changeUserInformation(id:number,input:ChangeInformationDto) {
      await this.findById(id)
      const fields=[]
      const values=[]
      console.log(input)
      try{
        for (const [key, value] of Object.entries(input)) {
            fields.push(`${key} = ?`);
            values.push(value);
        }
        values.push(id)
        await this.dataBaseService.runQuery(`UPDATE user SET ${fields.join(' ,') } WHERE id=?`,values)
        return 'informations are changed'
      }catch(error) {
        throw new HttpException(error,error.status)
      }
   }

   async deleteUser(id:number) {
    try{
  await this.findById(id)
  await this.dataBaseService.runQuery('DELETE FROM user WHERE id=?',[id])
  return 'user is deleted';
    }catch(error){
        throw new HttpException(error,error.status)
    }
   }

   async assignRole(id:number,body:AssignRoleDto) {
    await this.findById(id)
    try{
    await this.dataBaseService.runQuery('UPDATE user SET role=? WHERE id=?',[body.role,id])
    return `role ${body.role} is assigned to user`;
    }catch(error){
        throw new HttpException(error,error.status)
    }
   }

   async findById(id:number) {
    try{
    const rows=await this.dataBaseService.runQuery('SELECT * FROM user WHERE id=?',
     [id]
    )
    const result=rows[0] as IUser[]
    if(result.length===0) {
     throw new HttpException('user with this id is not Found',HttpStatus.NOT_FOUND)
    }
    return result[0]
    }catch(error){
        throw new HttpException(error,error.status||HttpStatus.INTERNAL_SERVER_ERROR)
    }
}

}
