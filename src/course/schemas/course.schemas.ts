import { HydratedDocument } from "mongoose";
import { Prop ,Schema ,SchemaFactory } from "@nestjs/mongoose";

export type CourseDocument = HydratedDocument<Course>


@Schema({ timestamps: true })
export class Course {
  @Prop({ required: true, trim: true })
  name: string;

  @Prop({ required: true, trim: true })
  des: string;

  @Prop({ required: true, unique: true, lowercase: true, trim: true })
  level: string;

  @Prop({ required: true})
  price: number;
}

export const CourseSchema = SchemaFactory.createForClass(Course);
