
import {defaultAuth} from "../firebase/firebase";


export const authCheck = async (req, res, next) => {
  //console.log(req.headers); //token
  try {
    console.log(req.headers);
    const firebaseUser = await defaultAuth.verifyIdToken(req.headers.authtoken);

    console.log('FIREBASE USER IN AUTHCHECK', firebaseUser);
    req.user = firebaseUser;
    next();
  } catch (err) {
    res.status(401).json({
      err: "Invalid or expired token",
    });
  }
};
