import multer from 'multer';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// __dirname = server/src/middleware/, so ../../uploads = server/uploads/
const uploadsRoot = path.join(__dirname, '../../uploads');

const ensureDir = (dir: string) => { if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true }); };

ensureDir(path.join(uploadsRoot, 'pdf'));
ensureDir(path.join(uploadsRoot, 'images'));
ensureDir(path.join(uploadsRoot, 'cv'));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Check fieldname first so CV PDFs go to uploads/cv, not uploads/pdf
    if (file.fieldname === 'cv') cb(null, path.join(uploadsRoot, 'cv'));
    else if (file.mimetype === 'application/pdf') cb(null, path.join(uploadsRoot, 'pdf'));
    else cb(null, path.join(uploadsRoot, 'images'));
  },
  filename: (req, file, cb) => {
    const unique = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + '-' + unique + path.extname(file.originalname));
  }
});

const pdfFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (file.mimetype === 'application/pdf') cb(null, true);
  else cb(new Error('Only PDF files are allowed!'));
};

const imageFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (/^image\//.test(file.mimetype)) cb(null, true);
  else cb(new Error('Only image files are allowed!'));
};

const cvFilter = (req: Express.Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  if (/\.(pdf|doc|docx)$/i.test(file.originalname)) cb(null, true);
  else cb(new Error('Only PDF/DOC files allowed'));
};

export const upload = multer({ storage, fileFilter: pdfFilter, limits: { fileSize: 5 * 1024 * 1024 } });
export const uploadImage = multer({ storage, fileFilter: imageFilter, limits: { fileSize: 10 * 1024 * 1024 } });
export const uploadCv = multer({ storage, fileFilter: cvFilter, limits: { fileSize: 10 * 1024 * 1024 } });
