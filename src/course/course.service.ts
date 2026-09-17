import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './dto/create-course.dto.js';
import { UpdateCourseDto } from './dto/update-course.dto.js';
import { Model } from 'mongoose';
import { Course } from './schemas/course.schemas.js';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class CourseService {
    [x: string]: any;
constructor(@InjectModel(Course.name) private model : Model<Course>){}

  async create(createCourseDto: CreateCourseDto) {
   return await this.model.create(
     
      {
        name : createCourseDto.name,   //db variable  me se schema ki variale lo  value assign hori
        des : createCourseDto.description,
        level : createCourseDto.level,
        price : createCourseDto.price
      }
    );


  }

  findAll() {
    return `This action returns all course`;
  }

  findOne(id: number) {
    return `This action returns a #${id} course`;
  }

  update(id: number, updateCourseDto: UpdateCourseDto) {
    return `This action updates a #${id} course`;
  }

  remove(id: number) {
    return `This action removes a #${id} course`;
  }
}
