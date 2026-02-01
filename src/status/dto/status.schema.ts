import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
export type StatusDocument = HydratedDocument<Status>;
@Schema({
    versionKey: false,
    timestamps: false,
    validateBeforeSave: true
})

export class Status{
    @Prop({required: true, unique: true})
    name: string;

    @Prop({required: true})
    statusfor: string;

    @Prop({default: Date.now})
    createDate: Date;

    @Prop({default: Date.now})
    updateDate: Date;
}
export const StatusSchema = SchemaFactory.createForClass(Status);