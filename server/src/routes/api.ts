import { Router } from 'express';
import { getVacancies, createVacancy } from '../controllers/vacancyController.js';
import { getNotices, createNotice } from '../controllers/noticeController.js';
import { getContacts, submitContact, getMapInfo } from '../controllers/contactController.js';

const router = Router();

// Vacancy routes
router.get('/vacancies', getVacancies);
router.post('/vacancies', createVacancy);

// Notice routes
router.get('/notices', getNotices);
router.post('/notices', createNotice);

// Contact routes
router.get('/contacts', getContacts);
router.post('/contact-submit', submitContact);
router.get('/map', getMapInfo);

export default router;
