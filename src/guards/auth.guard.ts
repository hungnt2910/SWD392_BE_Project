import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private jwtService: JwtService){}

  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const authHeader = request.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      throw new UnauthorizedException('Invalid or missing access token');
    }

    const token = authHeader.split(' ')[1]; 
    console.log('Extracted Token:', token); 

    if(!token){
        throw new UnauthorizedException('Invalid Token')
    }

    try{
        const payload = this.jwtService.verify(token)
        request.userId = payload.userId
    }catch(e){
        Logger.error(e.message)
        throw new UnauthorizedException('Invalid Token')
    }

    return true; 
  }

  // Example method to validate the token (e.g., using JWT)
  private validateToken(token: string): boolean {
    // Implement your token validation logic here
    // For example, using a library like `jsonwebtoken`
    return true; // Placeholder
  }
}