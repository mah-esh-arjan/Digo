import { Router } from 'express';
import { getVacancies, createVacancy, updateVacancy, deleteVacancy } from '../controllers/vacancyController.js';
import { getNotices, createNotice } from '../controllers/noticeController.js';
import { getContacts, submitContact, getMapInfo } from '../controllers/contactController.js';
import { getGalleryImages, createGalleryImage, deleteGalleryImage } from '../controllers/galleryController.js';
import { upload, uploadImage } from '../middleware/upload.js';

const router = Router();

// Vacancy routes
router.get('/vacancies', getVacancies);
router.post('/vacancies', createVacancy);
router.put('/vacancies/:id', updateVacancy);
router.delete('/vacancies/:id', deleteVacancy);

// Notice routes
router.get('/notices', getNotices);
router.post('/notices', upload.single('pdf'), createNotice);

// Gallery routes
router.get('/gallery', getGalleryImages);
router.post('/gallery', uploadImage.single('image'), createGalleryImage);
router.delete('/gallery/:id', deleteGalleryImage);

// Contact routes
router.get('/contacts', getContacts);
router.post('/contact-submit', submitContact);
router.get('/map', getMapInfo);

export default router;
