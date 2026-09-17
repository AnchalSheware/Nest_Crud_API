import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserService } from '../user/user.service.js';
import { RegisterDto } from './dto/registerUser.dto.js';
import bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from './dto/login.dto.js';

@Injectable()
export class AuthService {
  //whatever the userservice we have made we are using in authservie :

  constructor(private readonly userService: UserService,
    private readonly jwtToken  : JwtService
  ) {}

  //here we will simply write the logc
  async registerUser(registerUserDto: RegisterDto) {
    //encrypting the password
    const saltRounds = 10;
    const hash = await bcrypt.hash(registerUserDto.password, saltRounds);

    // Logic :
    //Email exits
    //hash pass
    //user store in db
    //generate token
    //send token in response

    const user = await this.userService.createUser({
      ...registerUserDto,
      password: hash,
    });

    const payload = {sub : user?.fname,}

    const token = await this.jwtToken.signAsync(payload)
    console.log('Token', user, token);
    return {accessToken : token};
  }

  async loginUser(loginDto :LoginDto ){
    const user =  await  this.userService.findByEmail(loginDto.email)
     //We are fininging ki db me email hai ki nahi
     if(!user)
     {
      throw new UnauthorizedException("Invalid User or Password")
     }
     //user nhi raha to email doesnt exist
     //email hai to password ko check krenge userpassword se
     const passwordMatch = await bcrypt.compare(
       loginDto.password, user.password
     )

     if(!passwordMatch)
     {
      throw new UnauthorizedException("Invalid user or Password")
     }
     const token = await this.jwtToken.signAsync({
       sub : user._id.toString(),
       email : user.email,

     });
     console.log(token)
     if(token)
     {
      console.log("Successfully Loggedin")
     }
     return {accessToken : token , message : "User Logged In Successfully"}
  }
}