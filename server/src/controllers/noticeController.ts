import { Request, Response } from 'express';
import prisma from '../lib/prisma';

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
  const { title, content, fileUrl } = req.body;
  try {
    const notice = await prisma.publicNotice.create({
      data: { title, content, fileUrl }
    });
    res.status(201).json(notice);
  } catch (error) {
    res.status(500).json({ error: "Failed to create public notice" });
  }
};
