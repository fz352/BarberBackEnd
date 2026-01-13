import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

type TokenPayload = {
    id: string;
    iat: number;
    exp: number;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
    }
  }
}

export function AuthMiddleware(
    req: Request, 
    res: Response,
    next: NextFunction
): void{
    const { authorization } = req.headers;

    if(!authorization){
      res.status(401).json({error: "Token not provided"});
      return;
    }

    const [,token] = authorization.split(" ");

    try{
       const decoded = verify(token, "eb7f198d389ffad9d762a0f2f6cca87c");
       const {id} = decoded as TokenPayload;
       req.userId = id;
       next();

    } catch(error){
        res.status(401).json({error: "Token invalid"});
        return;
    }

}