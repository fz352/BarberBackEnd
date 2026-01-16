import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';

type TokenPayload = {
    id: string;
    type: 'ADMIN' | 'CLIENT' | 'BARBER';
    iat: number;
    exp: number;
}

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userType?: 'ADMIN' | 'CLIENT' | 'BARBER';
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
      res.status(401).json({error: "Token não fornecido"});
      return;
    }

    const [,token] = authorization.split(" ");
    const secretKey = process.env.SECRET_KEY;
    if (!secretKey) {
        res.status(500).json({ error: "Erro de configuração do servidor: SECRET_KEY não definida." });
        return;
    }

    try{
       const decoded = verify(token, secretKey) as TokenPayload;
       req.userId = decoded.id;
       req.userType = decoded.type;
       next();

    } catch(error){
        res.status(401).json({error: "Token inválido"});
        return;
    }

}

export function authorizeRole(role: 'ADMIN' | 'CLIENT' | 'BARBER') {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.userType !== role) {
      res.status(403).json({ error: "Acesso negado" });
      return;
    }
    next();
  };
}