import { Request, Response, query } from "express";
import { UserEntity } from "../entities/user.entity";
import RespositoryHelper from "../helpers/repositoryHelper";

interface CustomRequest extends Request {
  user?: any; // Define the user property as optional
  file?: any;
}

class UserController {
  static async createNewUser(request: CustomRequest, response: Response) {
    const user = request.user;
    const { email } = user;
    // const avatarFile = request.file.path; //store in db
    console.log("!!!!!" + JSON.stringify(request.body) + "<<<<<");

    
    //if email/username has existed
    const existingUser = await RespositoryHelper.userRepo.findOne({
      where: { email },
    });
    if (existingUser) {
      return response.status(400).json({
        message: "Email already in use",
      });
    }
   
    // create a new User
    const newUser = new UserEntity();
    newUser.email = email;
    newUser.username = request.body.username;
    if(request.file)
    { newUser.profilephotolink = request.file.path; }
    console.log(JSON.stringify(newUser) + ">>>>>");

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


// exports.createOrUpdateUser = async (req, res) => {
//   const { name, picture, email } = req.user;

//   const user = await User.findOneAndUpdate(
//     { email: email },
//     { name: email.split("@")[0], picture },
//     { new: true }
//   );
//   if (user) {
//     console.log("USER UPDATED", user);
//     res.json(user);
//   } else {
//     const newUser = await new User({
//       email,
//       name: email.split("@")[0],
//       picture,
//     }).save();
//     console.log("USER CREATED", newUser);
//     res.json(newUser);
//   }
// };