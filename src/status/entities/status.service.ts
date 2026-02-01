import { BadGatewayException, BadRequestException, ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectModel } from "@nestjs/mongoose";
import { Status, StatusDocument } from "../dto/status.schema";
import { Model } from "mongoose";

@Injectable()
export class StatusService{
    constructor(
        @InjectModel(Status.name)
        private readonly StatusModel: Model<StatusDocument>
    ){}

    async findAll(): Promise<Status[]>{
        return this.StatusModel.find().exec();
    }

    async findbyID(id: string): Promise<Status>{
        const status = await this.StatusModel.findById(id);
        if(!status){
            throw new NotFoundException('User not found')
        }

        return status;
    }

    async create(data: Partial<Status>): Promise<Status>{
        try{
            const status = new this.StatusModel(data)
            return status.save();
        }catch(err:any){
            if(err?.code === 11000){
                const field = Object.keys(err.keyPattern || err.keyValue || {})[0];

                if(field === "name"){
                    throw new ConflictException('name already exists');
                }
            }

            if(err?.name === 'ValidationError'){
                throw new BadGatewayException(err.message)
            }

            throw new InternalServerErrorException('update failed')
        }
    }

    async update(id:string, data: Partial<Status>):Promise<Status>{
        try{
            const update = await this.StatusModel.findByIdAndUpdate(
                id,
                {
                    ...data,
                    updateDate: new Date(),
                },
                { new: true, runValidators: true }
            )

            if(!update){
                throw new NotFoundException('user is not found')
            }

            return update;
        } catch(err: any){
            if(err?.code === 11000){
                const field = Object.keys(err.keyPattern || err.keyValue || {})[0];
                if(field === 'name'){
                    throw new ConflictException('name already exists')
                }
            }

            if(err?.name === "ValidationError"){
                throw new BadRequestException(err.message)
            }

            throw new InternalServerErrorException('updated failed')
        }
    }

    async remote(id: string): Promise<{message: string}>{
        const deleted = await this.StatusModel.findByIdAndDelete(id)

        if(!deleted){
            throw new NotFoundException('status not found')
        }

        return{ message: 'status is deleted'}
    }
}