import { Request, Response, Router } from 'express';
import fs from 'fs';
import path from 'path';

const router = Router();

router.get(
  '/:profile_post_image/:imageURN',
  async (req: Request, res: Response) => {
    const pathPrefix = req.params.profile_post_image;
    const filePath = path.join(
      __dirname,
      '/../images',
      pathPrefix,
      req.params.imageURN
    );

    fs.readFile(filePath, (err, data) => {
      if (err || !data) {
        console.log(err);
        return res.status(404).send('Image Not Found');
      }
      console.log(data);
      res.setHeader('Content-Type', 'image/jpeg');
      return res.send(data);
    });
  }
);

export default router;
