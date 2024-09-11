import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, Request, Res, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { UserService } from './user.service';
import { EditProfileDto } from './dto/editProfile.dto';
import { AuthGuard } from 'src/common/guards/authenticate.guard';
import { AdminGuard } from 'src/common/guards/authorize.guard';
import { ChangeInformationDto } from './dto/changeInformation';
import { AssignRoleDto } from './dto/assignRole.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { fileName, imageFileFilter } from 'src/common/utils';
import { responseInterceptor } from 'src/common/interceptors/response.interceptor';
import { QueryDto } from 'src/common/dto/query.dto';
@Controller('user')
@UseInterceptors(new responseInterceptor())
export class UserController {
    constructor(private userService:UserService){}
    @UseInterceptors(FileInterceptor('image',{
        storage: diskStorage({
          destination: './files', 
          filename:fileName
        }),fileFilter:imageFileFilter
      }))
    @UseGuards(AuthGuard)
    @Post('uloadImage')
    async uploadProfile(@UploadedFile() file:Express.Multer.File,@Request() {user}) {
      return await this.userService.uploadProfile(file?.filename,user)
    }

    @Get('image/:imgpath')
    seeImage(@Param('imgpath') image, @Res() res) {
     return res.sendFile(image, { root: './files' });
   }

   @UseGuards(AuthGuard)
    @Patch('editMyProfile')
    async editMyProfile(@Body() editProfile:EditProfileDto,@Request() {user}) {
      return await this.userService.editMyProfile(editProfile,user)
    }

    @UseGuards(AuthGuard,AdminGuard)
    @Get('allUsers')
    async getAllUsers(@Query() query:QueryDto, @Request() {user}) {
        return await this.userService.getAllUsers(query)
    }

    @UseGuards(AuthGuard,AdminGuard)
    @Delete('delete/:id')
    async deleteUser(@Param('id',ParseIntPipe) id:number) {
        return await this.userService.deleteUser(id)
    }

    @UseGuards(AuthGuard,AdminGuard)
    @Patch('changeUser/:id')
    async changeUser(@Param('id',ParseIntPipe) id:number,@Body() changeUserInformation:ChangeInformationDto) {
        return await this.userService.changeUserInformation(id,changeUserInformation)
    }
     
    @UseGuards(AuthGuard,AdminGuard)
    @Patch('assignRole/:id')
    async assignRole(@Param('id',ParseIntPipe) id:number,@Body() body:AssignRoleDto) {
        return await this.userService.assignRole(id,body)
    }


}
