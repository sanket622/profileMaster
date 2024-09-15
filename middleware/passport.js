import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import passport from 'passport';
import User from '../models/userModel.js';
import dotenv from 'dotenv';

dotenv.config();

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: process.env.JWT_SECRET, // Ensure this matches the key in your .env file
};

passport.use(
  new JwtStrategy(opts, async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id);
      if (user) return done(null, user);
      return done(null, false);
    } catch (error) {
      return done(error, false);
    }
  })
);


// Incoming Request: A request with a JWT in the Authorization header arrives at the server.
// JWT Extraction: ExtractJwt.fromAuthHeaderAsBearerToken() extracts the JWT from the Authorization header.
// JWT Verification: JwtStrategy verifies the JWT using the secret from process.env.JWT_SECRET.
// User Lookup: The JWT payload (which includes the user ID) is used to find the user in the database.
// Authentication Result: Depending on whether the user is found or not, Passport will call the done callback with either the user object (successful authentication) or false (authentication failed).
// In your project, Passport is used for handling authentication, providing a middleware framework that simplifies user authentication strategies. JWT (JSON Web Tokens), facilitated by JwtStrategy from the passport-jwt package, allows you to manage user sessions securely without server-side storage. ExtractJwt is used to extract the JWT from incoming requests, typically from the Authorization header as a Bearer token. By integrating these tools, you enable your application to authenticate users via JWTs, ensuring that requests to protected routes are verified for valid tokens, thereby enhancing security and allowing stateless authentication.


//we're not exporting any functions or variables here (the file is used for side effects, i.e., configuring passport), there's no need to export anything explicitly. The passport.use() method configures the strategy globally, so other parts of the application can use it.
// You only need to import this file where you initialize Passport in your main server file or where it's required.