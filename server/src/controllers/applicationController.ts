import { Request, Response } from 'express';
import prisma from '../lib/prisma.js';

export const submitApplication = async (req: Request, res: Response) => {
  const { vacancyId, name, email, phone, message } = req.body;
  const file = req.file;

  if (!vacancyId || !name || !email || !file) {
    return res.status(400).json({ error: 'vacancyId, name, email and CV are required' });
  }

  try {
    const application = await prisma.jobApplication.create({
      data: {
        vacancyId: Number(vacancyId),
        name,
        email,
        phone: phone || null,
        message: message || null,
        cvUrl: `/uploads/cv/${file.filename}`,
      }
    });
    res.status(201).json(application);
  } catch (error) {
    res.status(500).json({ error: 'Failed to submit application' });
  }
};

export const getApplications = async (req: Request, res: Response) => {
  try {
    const applications = await prisma.jobApplication.findMany({
      orderBy: { createdAt: 'desc' }
    });
    res.json(applications);
  } catch {
    res.status(500).json({ error: 'Failed to fetch applications' });
  }
};
