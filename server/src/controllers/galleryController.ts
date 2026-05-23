import { Request, Response } from 'express';
import prisma from '../lib/prisma.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const getGalleryImages = async (req: Request, res: Response) => {
  try {
    const images = await prisma.galleryImage.findMany({ orderBy: { createdAt: 'desc' } });
    res.json(images);
  } catch {
    res.status(500).json({ error: 'Failed to fetch gallery images' });
  }
};

export const createGalleryImage = async (req: Request, res: Response) => {
  const { title, category } = req.body;
  const file = req.file;

  if (!title || !category || !file) {
    return res.status(400).json({ error: 'Title, category, and image are required' });
  }

  try {
    const image = await prisma.galleryImage.create({
      data: { title, category, imageUrl: `/uploads/images/${file.filename}` }
    });
    res.status(201).json(image);
  } catch {
    res.status(500).json({ error: 'Failed to upload image' });
  }
};

export const deleteGalleryImage = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const image = await prisma.galleryImage.findUnique({ where: { id: Number(id) } });
    if (!image) return res.status(404).json({ error: 'Image not found' });

    // Delete file from disk using absolute path
    const filePath = path.join(__dirname, '../../uploads', image.imageUrl.replace('/uploads/', ''));
    if (fs.existsSync(filePath)) fs.unlinkSync(filePath);

    await prisma.galleryImage.delete({ where: { id: Number(id) } });
    res.json({ message: 'Image deleted' });
  } catch {
    res.status(500).json({ error: 'Failed to delete image' });
  }
};
