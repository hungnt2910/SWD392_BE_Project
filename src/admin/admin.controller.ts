import { Body, Controller, Delete, Get, Param, Post, Put } from '@nestjs/common';
import { AdminService } from './admin.service';
import { UpdateUserDto } from './dtos/UpdateUser.dto';

@Controller('admin')
export class AdminController {
    constructor(private readonly adminService: AdminService){}

    @Get('user')
    getAllAccount(){
        return this.adminService.getAllUser()
    }

    @Delete('user/:userId')
    removeUser(@Param('userId') userId : number){
        return this.adminService.deleteUser(userId)
    }

    @Put('user/:userId')
    editUserProfile(@Body() userInfo : UpdateUserDto, @Param('userId') userId : number){
        return this.adminService.editUser(userInfo, userId)
    }
}
