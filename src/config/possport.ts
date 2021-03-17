import { PassportStatic } from 'passport';
import { Strategy as FacebookStrategy } from 'passport-facebook';
import { EXPRESS_ENDPOINT } from '../constants';
import { User } from '../entities/User';

export const FacebookOAuthSetup = (passport: PassportStatic) => {
  passport.use(
    new FacebookStrategy(
      {
        clientID: process.env.CLIENT_ID!,
        clientSecret: process.env.CLIENT_SECRET!,
        callbackURL: `${EXPRESS_ENDPOINT}/auth/facebook/callback`,
        profileFields: ['id', 'displayName', 'photos', 'emails', 'gender'],
      },
      async (accessToken, _refreshToken, profile, _done) => {
        const imgURL = `https://graph.facebook.com/${profile.id}/picture?width=250&height=250&access_token=${accessToken}`;
        console.log(profile);
      }
    )
  );
  passport.serializeUser((user, done) => {
    done(null, user.id);
  });

  passport.deserializeUser(async (id: string, done) => {
    try {
      const user = await User.findOne(id);
      done(null, user);
    } catch (err) {
      done(err, false);
    }
  });
};
