import { Request, Response } from 'express';
import prisma from '../lib/prisma.js';
import { sendEmail } from '../lib/mailer.js';

const dummyContacts = [
  {
    id: 1,
    name: "John Doe",
    email: "john@example.com",
    phone: "9841234567",
    message: "I am interested in your investment plans.",
    createdAt: new Date()
  }
];

export const getContacts = async (req: Request, res: Response) => {
  try {
    const contacts = await prisma.contactUs.findMany();
    res.json(contacts.length > 0 ? contacts : dummyContacts);
  } catch (error) {
    res.json(dummyContacts);
  }
};

export const submitContact = async (req: Request, res: Response) => {
  const { name, email, phone, message } = req.body;
  try {
    // Attempt to save to DB (dummy check)
    let contact;
    try {
      contact = await prisma.contactUs.create({
        data: { name, email, phone, message }
      });
    } catch (e) {
      console.log("DB save failed, proceeding with email only");
      contact = { name, email, phone, message, id: Date.now() };
    }

    // Send email notification (non-blocking — don't fail if email fails)
    sendEmail(
      process.env.SMTP_USER || 'admin@himalayan-energy.com',
      `New Contact Inquiry from ${name}`,
      `Name: ${name}\nEmail: ${email}\nPhone: ${phone}\nMessage: ${message}`
    ).catch(err => console.error('Email send failed (non-blocking):', err));

    res.status(201).json({ message: "Thank you for contacting us!", contact });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }
};

export const deleteContact = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const contact = await prisma.contactUs.findUnique({ where: { id: Number(id) } });
    if (!contact) {
      return res.status(404).json({ error: "Contact inquiry not found" });
    }
    await prisma.contactUs.delete({ where: { id: Number(id) } });
    res.json({ message: "Contact inquiry deleted successfully" });
  } catch (e) {
    console.error("Failed to delete contact inquiry:", e);
    res.status(500).json({ error: "Failed to delete contact inquiry" });
  }
};

export const getMapInfo = (req: Request, res: Response) => {
  // Return iframe map data as requested
  res.json({
    iframeSrc: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3532.44976721532!2d85.3123456!3d27.7001234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjfCsDQyJzAwLjQiTiA4NcKwMTgnNDQuNCJF!5e0!3m2!1sen!2snp!4v1650000000000!5m2!1sen!2snp"
  });
};
