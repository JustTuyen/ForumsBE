import { Body, Controller, HttpException, Post, UseFilters, 
    Delete, Get, Param, Put } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "../dto/user.schema";

@Controller('user')
export class UserController{
    constructor(private readonly userService: UserService){}

    @Get()
    async findAll(){
        return this.userService.findAll();
    }

    @Get(':id')
    async findByID(@Param('id') id: string){
        return this.userService.findbyID(id);
    }

    @Post()
    async create(@Body() body: Partial<User>){
        return this.userService.create(body)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: Partial<User>){
        return this.userService.update(id, body)
    }

    @Delete(':id')
    async removed(@Param('id') id: string){
        return this.userService.remote(id)
    }
}