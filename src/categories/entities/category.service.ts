import { BadGatewayException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Category, CategoryDocument } from "../dto/category.schema";
import { Model } from "mongoose";

@Injectable()
export class CategoryService{
    constructor(
        @InjectModel(Category.name)
        private readonly CategoryModel: Model<CategoryDocument>
    ){}

    async findAll():Promise<Category[]>{
        return this.CategoryModel.find().exec()
    }

    async findbyID(id: string): Promise<Category>{
        const category = await this.CategoryModel.findById(id).exec()

        if(!category){
            throw new NotFoundException('category not found')
        }

        return category
    }

    async create(data: Partial<Category>): Promise<Category>{
        const category = new this.CategoryModel(data) 
        
        return category.save()
    }

    async update(id: string, data: Partial<Category>):Promise<Category>{
        try{
            const updated = await this.CategoryModel.findByIdAndUpdate(
            id,
            {
                ...data,
                updateDate: new Date(),
            },
            { new: true, runValidators: true }
            )

            if(!updated){
                throw new NotFoundException('category not found')
            }

            return updated
            
        } catch(err: any){
            if (err?.code === 11000) {
                const field = Object.keys(err.keyPattern || err.keyValue || {})[0];
    
                if (field === "name") {
                    throw new ConflictException("name already exists");
                }
            }

            if (err?.name === "ValidationError") {
                throw new BadGatewayException(err.message);
            }

            throw new InternalServerErrorException('updated failed') 
        }
    }

    async remote(id: string): Promise<{message: string}>{
        const deleted = await this.CategoryModel.findByIdAndDelete(id)

        if(!deleted){
            throw new NotFoundException('category not fount')
        }

        return { message: "category is deleted!"}
    }

}