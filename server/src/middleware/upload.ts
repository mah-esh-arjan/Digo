import multer from 'multer';
import path from 'path';
import fs from 'fs';

const ensureDir = (dir: string) => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); };

ensureDir('uploads/pdf');
ensureDir('uploads/images');
ensureDir('uploads/cv');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') cb(null, 'uploads/pdf');
    else if (file.fieldname === 'cv') cb(null, 'uploads/cv');
    else cb(null, 'uploads/images');
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + unique + path.extname(file.originalname));
  }
});

const pdfFilter = (req: any, file: any, cb: any) => {
  file.mimetype === 'application/pdf' ? cb(null, true) : cb(new Error('Only PDF files are allowed!'), false);
};

const imageFilter = (req: any, file: any, cb: any) => {
  /^image\/(jpeg|jpg|png|webp|gif)$/.test(file.mimetype) ? cb(null, true) : cb(new Error('Only image files are allowed!'), false);
};

export const upload = multer({ storage, fileFilter: pdfFilter, limits: { fileSize: 5 * 1024 * 1024 } });
export const uploadImage = multer({ storage, fileFilter: imageFilter, limits: { fileSize: 10 * 1024 * 1024 } });

const cvFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  /\.(pdf|doc|docx)$/i.test(file.originalname) ? cb(null, true) : cb(new Error('Only PDF/DOC files allowed'));
};

export const uploadCv = multer({ storage, fileFilter: cvFilter, limits: { fileSize: 10 * 1024 * 1024 } });
