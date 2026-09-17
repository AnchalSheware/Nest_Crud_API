import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class RegisterDto {
  //here we specify what dat is actually coming from client
  @IsString()
  @IsNotEmpty()
  fname: string;

  @IsString()
  @IsNotEmpty()
  lname: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
