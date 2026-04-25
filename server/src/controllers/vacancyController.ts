import { Request, Response } from 'express';
import prisma from '../lib/prisma';

// Dummy data for initial view
const dummyVacancies = [
  {
    id: 1,
    title: "Senior Civil Engineer",
    description: "Looking for an experienced civil engineer for our upcoming hydropower project.",
    deadline: new Date("2026-05-30"),
    createdAt: new Date()
  },
  {
    id: 2,
    title: "Project Manager",
    description: "Manage large scale energy infrastructure projects.",
    deadline: new Date("2026-06-15"),
    createdAt: new Date()
  }
];

export const getVacancies = async (req: Request, res: Response) => {
  try {
    // If DB is not connected, it will fail, so we wrap in try-catch and return dummy if needed
    const vacancies = await prisma.vacancy.findMany();
    res.json(vacancies.length > 0 ? vacancies : dummyVacancies);
  } catch (error) {
    console.log("DB not connected, returning dummy data");
    res.json(dummyVacancies);
  }
};

export const createVacancy = async (req: Request, res: Response) => {
  const { title, description, deadline } = req.body;
  try {
    const vacancy = await prisma.vacancy.create({
      data: { title, description, deadline: new Date(deadline) }
    });
    res.status(201).json(vacancy);
  } catch (error) {
    res.status(500).json({ error: "Failed to create vacancy" });
  }
};
