import { Request, Response, NextFunction } from "express";
import { AuthService } from "./auth.service";
import { registerDto } from "./dto/auth.dto";

export class AuthController {
  private authService: AuthService;
  constructor() {
    this.authService = new AuthService();
  }

  registerUser = async (
    req: Request<{}, {}, registerDto>,
    res: Response,
    next: NextFunction
  ): Promise<any> => {
    try {
      const result = await this.authService.registerUser(req.body);
      res.status(200).json(result);
    } catch (error: any) {
       //throw new Error(`Error registering user by email: ${error.message}`);
       next(error)   
    }
  };
}
