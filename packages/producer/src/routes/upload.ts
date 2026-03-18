import { Router, Request, Response } from 'express';
import multer from 'multer';
import { config } from '../config';

export const uploadRouter = Router();

const upload = multer({ dest: config.uploadDir });

// POST /upload — accepts an image file, calls producerService.fanOut to create 4 jobs
uploadRouter.post('/', upload.single('image'), async (req: Request, res: Response): Promise<void> => {
  // TODO: validate uploaded file exists on req.file
  // TODO: call fanOut(req.file) from producer service
  // TODO: return the created jobIds
});
