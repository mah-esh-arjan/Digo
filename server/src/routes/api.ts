import { Router } from 'express';
import { getVacancies, createVacancy, updateVacancy, deleteVacancy } from '../controllers/vacancyController.js';
import { getNotices, createNotice, deleteNotice } from '../controllers/noticeController.js';
import { getContacts, submitContact, deleteContact, getMapInfo } from '../controllers/contactController.js';
import { getGalleryImages, createGalleryImage, deleteGalleryImage } from '../controllers/galleryController.js';
import { submitApplication, getApplications } from '../controllers/applicationController.js';
import { upload, uploadImage, uploadCv } from '../middleware/upload.js';

const router = Router();

// Vacancy routes
router.get('/vacancies', getVacancies);
router.post('/vacancies', createVacancy);
router.put('/vacancies/:id', updateVacancy);
router.delete('/vacancies/:id', deleteVacancy);

// Notice routes
router.get('/notices', getNotices);
router.post('/notices', upload.single('pdf'), createNotice);
router.delete('/notices/:id', deleteNotice);

// Gallery routes
router.get('/gallery', getGalleryImages);
router.post('/gallery', uploadImage.single('image'), createGalleryImage);
router.delete('/gallery/:id', deleteGalleryImage);

// Contact routes
router.get('/contacts', getContacts);
router.delete('/contacts/:id', deleteContact);
router.post('/contact-submit', submitContact);
router.get('/map', getMapInfo);

// Job applications
router.post('/apply', uploadCv.single('cv'), submitApplication);
router.get('/applications', getApplications);

export default router;
