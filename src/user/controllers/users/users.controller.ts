import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from 'src/user/dtos/CreateUser.dto';
import { UsersService } from 'src/user/services/users/users.service';

@Controller('users')
export class UsersController {
    constructor(private userService: UsersService){}

    @Get(':userId')
    getUser(@Param() userId: number){
        this.userService.findUser(userId)
    }

    @Post()
    createUser(@Body() createUserDto: CreateUserDto){
        this.userService.createUser(createUserDto)
    }
}
