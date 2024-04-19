import { Strategy as JwtStrategy, ExtractJwt } from "passport-jwt";
import dotenv from "dotenv";
import { getUserByUserName } from "../models/user.model";
import { loginReq } from "../types/types.req";
import { PassportStatic } from "passport";

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};

const passport = (passport: PassportStatic) => {
  passport.use(
    new JwtStrategy(opts, async (payload: loginReq, done) => {
      try {
        const user = await getUserByUserName(payload.userName)
        if (user) {
          return done(null, user)
        }
        else {
          return done(null, false)
        }
      } catch (error) {
        return done(error);
      }
    })
  );
}

export default passport