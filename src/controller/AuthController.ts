// import { Request, Response } from "express";
// import {prisma} from "../utils/prisma"
// import { compare} from "bcryptjs";
// import { sign } from "jsonwebtoken";


// export class AuthController {

//     async authenticate(req: Request, res: Response): Promise<void>  {
//       const {cpfCnpj, password } = req.body;


//       const pessoas = await prisma.pessoa.findUnique({where: {cpfCnpj}});

//       if(!pessoas){
//         res.json({error: "User not found"}); 
//         return;
//       }

//       const isValuePassword = await compare(password, pessoas.password);

//       if(!isValuePassword){
//         res.status(401).json({error:"Password incorrect"});
//         return;
//       };

//       const token = sign({id: pessoas.id}, "eb7f198d389ffad9d762a0f2f6cca87c", {expiresIn: "1d"});

//       const {id} = pessoas;

     
//       res.json({user: {id, cpfCnpj}, token});
//     };
// }