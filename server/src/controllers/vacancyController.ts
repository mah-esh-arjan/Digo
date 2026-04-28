import { Request, Response } from 'express';
import prisma from '../lib/prisma.js';

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
    const vacancies = await prisma.vacancy.findMany({
      orderBy: { createdAt: 'desc' }
    });
    // Return vacancies if found, otherwise return dummy data so the UI isn't empty
    if (vacancies.length > 0) {
      return res.json(vacancies);
    }
    console.log("No vacancies in DB, returning dummy data");
    res.json(dummyVacancies);
  } catch (error) {
    console.error("Error fetching vacancies from DB:", error);
    res.json(dummyVacancies);
  }
};

export const createVacancy = async (req: Request, res: Response) => {
  const { title, description, deadline } = req.body;
  
  if (!title || !description || !deadline) {
    return res.status(400).json({ error: "Missing required fields" });
  }

  try {
    const vacancy = await prisma.vacancy.create({
      data: { 
        title, 
        description, 
        deadline: new Date(deadline) 
      }
    });
    console.log("Vacancy created successfully:", vacancy.id);
    res.status(201).json(vacancy);
  } catch (error) {
    console.error("Failed to create vacancy in DB:", error);
    res.status(500).json({ 
      error: "Failed to create vacancy",
      details: error instanceof Error ? error.message : "Unknown error"
    });
  }
};

export const updateVacancy = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { title, description, deadline } = req.body;

  try {
    const vacancy = await prisma.vacancy.update({
      where: { id: Number(id) },
      data: { title, description, deadline: new Date(deadline) }
    });
    res.json(vacancy);
  } catch (error) {
    res.status(500).json({ error: 'Failed to update vacancy' });
  }
};

export const deleteVacancy = async (req: Request, res: Response) => {
  const { id } = req.params;

  try {
    await prisma.vacancy.delete({ where: { id: Number(id) } });
    res.json({ message: 'Vacancy deleted' });
  } catch (error) {
    res.status(500).json({ error: 'Failed to delete vacancy' });
  }
};
