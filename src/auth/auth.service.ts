import { BadRequestException, Injectable, UnauthorizedException } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'
import { User } from 'src/typeorm/entities/User'
import { Repository } from 'typeorm'
import { SignUpDto } from './dto/SignUpDto'
import * as bcrypt from 'bcrypt'
import { SignInDto } from './dto/SignInDto'
import { JwtService } from '@nestjs/jwt'

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    private jwtService: JwtService
  ) {}

  async signup(signupData: SignUpDto){
    const {email, username, password} = signupData
    //Check if email is use 
    const emailInUse = await this.userRepository.find({
      where: {email: signupData.email}
    })

    if(emailInUse.length !== 0){
      throw new BadRequestException("Email already exist")
    }

    //Hash Password
    const hashedPassword = await bcrypt.hash(signupData.password, 10)

    const newUser = this.userRepository.create({
      email,
      username,
      password: hashedPassword,
      created_at: new Date()
    })

    this.userRepository.save(newUser)
    return {message: "Register success"}
  }

  async signin(signinData: SignInDto){
    const {email, password} = signinData;
    const user = await this.userRepository.findOne({where : {email: email}})

    if(!user){
      throw new UnauthorizedException("Wrong credentials")
    }

    const comparedPassword = await bcrypt.compare(password, user.password)
    if(!comparedPassword){
      throw new UnauthorizedException("Wrong credentials")
    }

    return this.generateUserTokens(user.id)
  }

  async generateUserTokens(userId){
    const accessToken = this.jwtService.sign({userId}, {expiresIn: '3'})
  
    return{
      accessToken
    }
  }
}
