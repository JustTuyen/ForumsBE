import { flatten } from "@nestjs/common";
import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type UserDocument = HydratedDocument<User>;
@Schema({
    versionKey: false,
    timestamps: false,
    validateBeforeSave: true
})

export class User{
    @Prop({required: true, unique: true})
    username: string;

    @Prop({required: true, max: 50, unique: true})
    email: string;

    @Prop({required: true, max: 50})
    password: string;

    @Prop({
        type: String,
        required: false,
        max: 50,
        unique: true,
        sparse: true,
        default: null
        })
    phoneAddress?: string | null;

    @Prop({required: true, max: 50})
    role: string;

    @Prop({required: true, max: 25})
    gender: string;

    @Prop({required: false, max: 1000})
    description: string;

    @Prop({required: true, max: 50})
    rank: string;

    @Prop({required: true})
    birthday: Date;

    @Prop({default: Date.now})
    createDate: Date;

    @Prop({default: Date.now})
    updateDate: Date;
}

export const UserSchema = SchemaFactory.createForClass(User);