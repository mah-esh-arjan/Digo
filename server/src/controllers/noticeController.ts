import { Request, Response } from 'express';
import prisma from '../lib/prisma.js';

const dummyNotices = [
  {
    id: 1,
    title: "Annual General Meeting (AGM) Notice",
    content: "The 10th AGM of Himalayan Energy will be held on May 20th.",
    fileUrl: "https://example.com/agm-notice.pdf",
    createdAt: new Date()
  },
  {
    id: 2,
    title: "Public Share Allocation Result",
    content: "The results for the recent public share allocation have been published.",
    fileUrl: "https://example.com/share-result.pdf",
    createdAt: new Date()
  }
];

export const getNotices = async (req: Request, res: Response) => {
  try {
    const notices = await prisma.publicNotice.findMany();
    res.json(notices.length > 0 ? notices : dummyNotices);
  } catch (error) {
    console.log("DB not connected, returning dummy data");
    res.json(dummyNotices);
  }
};

export const createNotice = async (req: Request, res: Response) => {
  const { title, content } = req.body;
  let fileUrl = (req.body as { fileUrl?: string }).fileUrl;

  if (!title || !content) {
    return res.status(400).json({ error: "Title and content are required" });
  }

  // If a file was uploaded, use its path
  if (req.file) {
    // Construct the URL (e.g., http://localhost:5000/uploads/filename)
    fileUrl = `${req.protocol}://${req.get('host')}/uploads/pdf/${req.file.filename}`;
  }

  try {
    const notice = await prisma.publicNotice.create({
      data: { title, content, fileUrl }
    });
    console.log("Notice created successfully:", notice.id);
    res.status(201).json(notice);
  } catch (e) {
    console.error("Failed to create public notice in DB:", e);
    res.status(500).json({ 
      error: "Failed to create public notice",
      details: e instanceof Error ? e.message : "Unknown error"
    });
  }
};

export const deleteNotice = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const notice = await prisma.publicNotice.findUnique({ where: { id: Number(id) } });
    if (!notice) {
      return res.status(404).json({ error: "Notice not found" });
    }
    await prisma.publicNotice.delete({ where: { id: Number(id) } });
    res.json({ message: "Notice deleted successfully" });
  } catch (e) {
    console.error("Failed to delete notice:", e);
    res.status(500).json({ error: "Failed to delete notice" });
  }
};
