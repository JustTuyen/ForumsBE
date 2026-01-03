import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type ThreadDocument = HydratedDocument<Thread>;

@Schema({
    versionKey: false,
    timestamps: false,
    validateBeforeSave: true
})
export class Thread{
    @Prop({required: true, unique: true})
    name: string;

    @Prop({required: true})
    description: string;

    @Prop({default: Date.now})
    createDate: Date;

    @Prop({default: Date.now})
    updateDate: Date;
}

export const ThreadSchema = SchemaFactory.createForClass(Thread);