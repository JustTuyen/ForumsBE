import { ConflictException, Injectable, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Model } from "mongoose";
import { User, UserDocument } from "../dto/user.schema";
import { BadRequestException, InternalServerErrorException } from "@nestjs/common";

@Injectable()
export class UserService{
    constructor(
        @InjectModel(User.name)
        private readonly UserModel: Model<UserDocument>
    ){}

    async findAll():Promise<User[]>{
        return this.UserModel.find().exec()
    }

    async findbyID(id: string): Promise<User>{
        const user = await this.UserModel.findById(id).exec()

        if(!user){
            throw new NotFoundException('user not found')
        }
        return user
    }

    async create(data: Partial<User>): Promise<User> {
        try {

            const user = new this.UserModel(data)
            return user.save();

        } catch(err: any){
            // / Duplicate key error (unique username/email) : 11000
            if(err?.code === 11000){    
                const field = Object.keys(err.keyPattern || err.keyValue || {})[0];            
                if(field === "username"){
                    throw new ConflictException("Username already exist!")
                }
                if(field === "phoneAddress"){
                    throw new ConflictException("phoneAddress already exist!")
                }
                if(field === "email"){
                    throw new ConflictException("email already exist!")
                }
            }
            if (err?.name === "ValidationError") {
                throw new BadRequestException(err.message);
            }

            throw new InternalServerErrorException("Failed to create user");

        }
    }

   async update(id: string, data: Partial<User>): Promise<User> {
        if (data.phoneAddress?.trim() === "") data.phoneAddress = null;
    
        try {
                const update = await this.UserModel.findByIdAndUpdate(
                id,
                { ...data, updateDate: new Date() },
                { new: true, runValidators: true }
            );

            if (!update) throw new NotFoundException("user not found!");

            return update;
        } catch (err: any) {
            // Duplicate username/email
            if (err?.code === 11000) {
            const field = Object.keys(err.keyPattern || err.keyValue || {})[0];

            if (field === "username") {
                throw new ConflictException("Username already exists");
            }

            if (field === "email") {
                throw new ConflictException("Email already exists");
            }

            if(field === "phoneAddress"){
                throw new ConflictException("phoneAddress already exist!")
            }

            throw new ConflictException("Duplicate field value");
            }
            // Validation error
            if (err?.name === "ValidationError") {
            throw new BadRequestException(err.message);
            }
            // unknown
            throw new InternalServerErrorException("Update failed");
        }
    }

    async remote(id: string): Promise<{message: string}>{
        const deleted = await this.UserModel.findByIdAndDelete(id)
        if(!deleted){
            throw new NotFoundException('user not fount');
        }

        return{
            message: 'user is deleted'
        }
    }
}