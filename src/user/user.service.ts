import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { RegisterDto } from '../auth/dto/registerUser.dto.js';
import { User, UserDocument } from './user.schema.js';
 type UserWithoutPassword = UserDocument &{
    password :string
  }
@Injectable()
export class UserService {
  [x: string]: any;
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<UserDocument>,
  ) {}
 
  async createUser(registerUserDto: RegisterDto) {

    try{
  await this.userModel.create({ ...registerUserDto });
    console.log('User created:', {
      fname: registerUserDto.fname,
      lname : registerUserDto.lname,
      email: registerUserDto.email,
      password : registerUserDto.password,

    });
   return  {message : "User created Suucessfully",
       fname: registerUserDto.fname,
      lname : registerUserDto.lname,
      email: registerUserDto.email,
      password : registerUserDto.password

     }
    }
    catch(e: unknown)
    {
       console.log(e )
       const err = e as { code?: number; name?: string; message?: string };
       if(err.code==11000)
       {
        throw new ConflictException("Email Already Exists")
       }

       // Mongoose does enforce `required: true`; return its validation error
       // instead of swallowing it and continuing as if registration succeeded.
       if (err.name === 'ValidationError') {
         throw new BadRequestException(err.message);
       }

       throw e;
    }
    
     
    
  }

  async findByEmail (email : string){
    return this.userModel.findOne({email}).select('+password').exec() ;
  }

  async getUserID(id: string){
    return this.userModel.findOne({_id :id})
  }
 
}
