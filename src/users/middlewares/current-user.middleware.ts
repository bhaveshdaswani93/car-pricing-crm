import { Injectable, NestMiddleware } from "@nestjs/common";
import { Request, Response, NextFunction } from 'express';
import { User } from "../user.entity";
import { UsersService } from "../users.service";

declare global {
  namespace Express {
    interface Request {
      session?: any,
      currentUser?: User
    }
  }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
  constructor(private usersService: UsersService) {}
  async use (req: Request, res: Response, next: NextFunction) {
    const { userid } = req.session || {};
    if (userid) {
      const user = await this.usersService.findOne(userid);
      req.currentUser = user;
    }
    next();
  }
}
