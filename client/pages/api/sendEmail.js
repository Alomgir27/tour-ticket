// pages/api/sendEmail.js
import nodemailer from 'nodemailer';

export default async (req, res) => {
    if (req.method === 'POST') {
        try {
            const { to, subject, text } = req.body;

            // Create a transporter object
            const transporter = nodemailer.createTransport({
                service: 'Your Booking Ticket',
                auth: {
                    user: 'a.h.joy066@gmail.com',
                    pass: '#Joy115951',
                },
            });

            // Send mail with defined transport object
            await transporter.sendMail({
                from: 'a.h.joy066@gmail.com',
                to: to,
                subject: subject,
                text: text,
            });

            res.status(200).json({ message: 'Email sent successfully' });
        } catch (error) {
            console.error('Email error:', error);
            res.status(500).json({ error: 'Email sending failed' });
        }
    } else {
        res.status(405).json({ error: 'Method not allowed' });
    }
};
