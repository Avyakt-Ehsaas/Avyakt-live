import nodemailer from "nodemailer"

export const sendMail = async({to, subject, html}) => {
    // Using SendGrid SMTP
    const transporter = nodemailer.createTransport({
        host: 'smtp.sendgrid.net',
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'apikey', // This is literally the string 'apikey'
            pass: process.env.SENDGRID_API_KEY // Your SendGrid API key
        }
    });

    try {
        const info = await transporter.sendMail({
            from: `"Avyakt-Ehsaas 🧘" <${process.env.SENDGRID_SENDER_EMAIL || 'noreply@yourdomain.com'}>`,
            to,
            subject,
            html,
        });
        return info;
    } catch (error) {
        console.error('Error sending email:', error);
        throw error;
    }
}