import { Router } from 'express';
const router = Router();

router.get('/postImage', (req, res) => {
  const { userId }: any = req.session;
  console.log(userId);
  res.send(userId);
});

export default router;
