import { Body, Controller, HttpException, Post, UseFilters, 
    Delete, Get, Param, Put } from "@nestjs/common";
import { StatusService } from "./status.service";
import { Status } from "../dto/status.schema";

@Controller('status')
export class StatusController{
    constructor(private readonly statusService: StatusService){}

    @Get()
    async findAll(){
        return this.statusService.findAll()
    }

    @Get(':id')
    async findbyID(@Param('id') id: string){
        return this.statusService.findbyID(id)
    }

    @Post()
    async create(@Body() body: Partial<Status>){
        return this.statusService.create(body)
    }

    @Delete(':id')
    async deleted(@Param('id') id: string){
        return this.statusService.remote(id)
    }

    @Put(':id')
    async updated(@Param('id') id: string, @Body() body: Partial<Status>){
        return this.statusService.update(id, body);
    }
}