import { Request, Response, query } from "express";
import { UserEntity } from "../entities/user.entity";
import RespositoryHelper from "../helpers/repositoryHelper";

interface CustomRequest extends Request {
  user?: any; // Define the user property as optional
}

class UserController {

  static async createNewUser(request: CustomRequest, response: Response) {
    const user = request.user;
    const { email } = user;
  
    //if email/username has existed
    const existingUser = await RespositoryHelper.userRepo.findOne({
      where: { email },
    });
    if (existingUser) {
      return response.status(400).json({
        message: "Email already in use",
      });
    }
    //create a new User
    const newUser = new UserEntity();
    newUser.email = email;
    
    await UserEntity.save(newUser);
     console.log("USER CREATED", newUser);
     response.json(newUser);
  }

  static async currentUser(request: CustomRequest, response: Response) {
    const user = request.user;
    
    RespositoryHelper.userRepo
      .findOne({ where: { email: user.email } })
      .then((user) => {
        response.json(user);
        console.log(user);
      });
  }

  static async getUser(request: Request, response: Response) {
    const userId = parseInt(request.params.id);
    console.log(userId);

    const user = await RespositoryHelper.userRepo.findOne({
      where: { id: userId },
    });

   
  }
}
export default UserController;
