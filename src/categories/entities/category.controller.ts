import { Body, Controller, HttpException, Post, UseFilters, 
    Delete, Get, Param, Put } from "@nestjs/common";
import { CategoryService } from "./category.service";
import { Category } from "../dto/category.schema";

@Controller('category')
// @UseFilters(HttpException)
export class CategoryController{
    constructor(private readonly categoryService: CategoryService){}

    @Get()
    async findAll(){
        return this.categoryService.findAll();
    }

    @Get(':id')
    async findbyID(@Param('id') id : string){
        return this.categoryService.findbyID(id)
    }

    @Post()
    async create(@Body() body: Partial<Category>){
        return this.categoryService.create(body)
    }

    @Put(':id')
    async update(@Param('id') id: string, @Body() body: Partial<Category>){
        return this.categoryService.update(id, body)
    }

    @Delete(':id')
    async removed(@Param('id') id : string){
        return this.categoryService.remote(id)
    }


}