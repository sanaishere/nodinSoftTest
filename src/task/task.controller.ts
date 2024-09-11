import { Controller, Post, UseGuards ,Request, Body, UseInterceptors, UploadedFile, HttpException, HttpStatus, Patch, Param, Get, Delete} from '@nestjs/common';
import { TaskService } from './task.service';
import { AuthGuard } from 'src/common/guards/authenticate.guard';
import { CreateTaskDto } from './dto/create.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {  bodyFilter, fileName } from 'src/common/utils';
import { responseInterceptor } from 'src/common/interceptors/response.interceptor';
import { UPdateTaskDto } from './dto/update.dto';
//import { taskInterceptor } from 'src/common/interceptors/task.interceptor';

@Controller('task')
@UseInterceptors(new responseInterceptor())
export class TaskController {
    constructor(private taskService:TaskService) {}
    //@UseInterceptors(taskInterceptor)
    @UseInterceptors(FileInterceptor('file',{
        storage: diskStorage({
          destination: './files', 
          filename:fileName
        }),fileFilter: bodyFilter
      }))
    @UseGuards(AuthGuard)
    @Post('create')
    async create(@Request() {user},@Body() body:CreateTaskDto, @UploadedFile() file:Express.Multer.File) {
        if(!file) {
            throw new HttpException('add file please',HttpStatus.BAD_REQUEST)
        }
     return await this.taskService.create(user,body,file.filename)
    }

    @UseGuards(AuthGuard)
    @Get('getMyTasks')
    async getListOfTasks(@Request() {user}) {
       return await this.taskService.getListOfTasks(user)
    }

    @UseGuards(AuthGuard)
    @Get('getOne/:id')
    async getOneTask(@Param('id') id:number,@Request() {user}) {
      return await this.taskService.getOneTask(id,user)
    }


    @UseInterceptors(FileInterceptor('file',{
        storage: diskStorage({
          destination: './files', 
          filename:fileName
        }),fileFilter:bodyFilter
      }))
    @UseGuards(AuthGuard)
    @Patch('edit/:id')
    async update(@Param('id') id:number,@Request() {user},@UploadedFile() file:Express.Multer.File,@Body() updateBody:UPdateTaskDto) {
     let fileName=file?file.filename:null
      return await this.taskService.update(id,user,fileName,updateBody)
    }

    @UseGuards(AuthGuard)
    @Delete('delete/:id')
    async delete(@Param('id') id:number ,@Request() {user}) {
      return await this.taskService.delete(id,user)
    }

    
}
