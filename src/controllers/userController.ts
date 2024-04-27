import { Request, Response, query } from "express";
import { hashPassword } from "../helpers/helper";
import { UserEntity } from "../entities/user";

class UserController {
    static async signup(request: Request, response: Response) {
        //get userinfo from req.body
        const { username, email, password } = request.body;

        //check if username, email, password is provided
        if (!username || !email || !password) {
             return response.status(400).json({
               message:
                 "Please provide all the info for the username/email/password in the request",
             });
        }
        //if email/username has existed 
        const existingUser = await UserEntity.findOne({ where: { email } })
        if (existingUser) {
             return response.status(400).json({
               message:
                 "Email already in use",
             });
        }
        //new user
        const user = new UserEntity()
        user.email = email;
        user.username = username;

        //hash password
        const hashedPassword = await hashPassword(password);
        user.password = hashedPassword;
        
        //send activation email


  }

  static async login(request: Request, response: Response) {}
}

export default UserController;
