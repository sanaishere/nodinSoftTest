import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DataBaseService } from 'src/common/DataBaseService';
import { CreateTaskDto } from './dto/create.dto';
import { IUser } from 'src/common/interfaces/user.interface';
import { ITask } from 'src/common/interfaces/task.interface';
import { UPdateTaskDto } from './dto/update.dto';
import { Base_Url } from 'src/common/url';

@Injectable()
export class TaskService {
    constructor(private dataBaseService:DataBaseService,
    ){}
    async create(user: IUser,taskInput :CreateTaskDto,fileName:string) {
      console.log('before')
      const url=await this.fileUrl(fileName)
      try{
      await this.dataBaseService.runQuery('INSERT INTO task (name,description,file,userId) VALUES (?,?,?,?)',
        [taskInput.name,taskInput.description,url,user.id]
      )
      }catch(error){
        throw new HttpException(error,error.status||HttpStatus.INTERNAL_SERVER_ERROR)
    }
      return 'task is successfully created'
    }

    async getListOfTasks(user:IUser) {
      console.log(user)
      const queryResult= await this.dataBaseService.runQuery('SELECT * FROM task WHERE userId=?',[user.id])
      const tasks=queryResult[0] 
      return tasks
    } 

    async getOneTask(id:number,user:IUser) {
      try{
        const rows=await this.dataBaseService.runQuery('SELECT * FROM task WHERE id=?',
         [id]
        )
        const result=rows[0] as ITask[]
        if(result.length===0) {
         throw new HttpException('task with this id is not Found',HttpStatus.NOT_FOUND)
        }
        const task=result[0]
        await this.checkUsersTobeEqual(user.id,task.userId)
        return task
        }catch(error){
            throw new HttpException(error,error.status||HttpStatus.INTERNAL_SERVER_ERROR)
        }
    }

    async update(id:number,user:IUser,fileName:string,updateBody:UPdateTaskDto) {
      await this.getOneTask(id,user)
      const fields=[]
      const values=[]
      try{
       for (const [key, value] of Object.entries(updateBody)) {
          fields.push(`${key} = ?`);
          values.push(value);
        }
      if (fileName!==null){
        fields.push(`file = ?`);
        values.push(await this.fileUrl(fileName))
      }
      values.push(user.id)
      await this.dataBaseService.runQuery(`UPDATE task SET ${fields.join(' ,')} WHERE id=?`,values)
      return `task informations  are updated successfully`
     }catch(error) {
      throw new HttpException(error,error.status)
    }
    }

    async delete(id:number,user:IUser) {
      await this.getOneTask(id,user)
      try{
        await this.dataBaseService.runQuery('DELETE FROM task WHERE id=?',[id])
        return 'task is deleted';
          }catch(error){
              throw new HttpException(error,error.status)
          }
    }


    async checkUsersTobeEqual(userId:number,taskUserId:number) {
      if(userId!==taskUserId) {
        throw new HttpException('you can not see task that is not yours',HttpStatus.FORBIDDEN)
      }
    }

    async fileUrl(fileName:string) {
      return `${Base_Url}/task/file/${fileName}`
    }
    
}
