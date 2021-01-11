import { Router } from 'express';
import passport from 'passport';

const router = Router();

router.get(
  '/facebook',
  passport.authenticate('facebook', { scope: ['email'] })
);

router.get(
  '/facebook/callback',
  passport.authenticate('facebook', {
    successRedirect: `/`,
    failureRedirect: `${process.env.FRONTEND_URL}/login`,
  })
);

export default router;
