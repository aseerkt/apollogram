import { Request, Response, Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get('/:imageURN', async (req: Request, res: Response) => {
  fs.readFile(
    path.join(`${__dirname}/../../images/${req.params.imageURN}`),
    (err, data) => {
      if (err || !data) {
        console.log(err);
        return res.status(404).send('Image Not Found');
      }
      console.log(data);
      res.setHeader('Content-Type', 'image/jpeg');
      return res.send(data);
    }
  );
});

export default router;
