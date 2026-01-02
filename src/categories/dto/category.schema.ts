import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

export type CategoryDocument = HydratedDocument<Category>;

@Schema({
    //versionKey: false,
    timestamps: true,
    validateBeforeSave: true
})
export class Category{
    @Prop({required: true, unique: true})
    name: string;

    @Prop({required: true})
    description: string;

    @Prop({default: Date.now})
    createDate: Date;

    @Prop({default: Date.now})
    updateDate: Date;
}

export const CategorySchema = SchemaFactory.createForClass(Category);