import sgMail from '@sendgrid/mail';
import { NextResponse } from 'next/server';

sgMail.setApiKey(process.env.NEXT_PUBLIC_SENDGRID_API_KEY || '');

export async function POST(request: Request) {
    try {
        const { firstName, lastName, email, message, inquiryType } = await request.json();

        const content = {
            to: 'kc@kacey.dev',
            from: email,
            subject: `New Message from ${firstName} ${lastName} - ${inquiryType}`,
            text: message,
            html: `<p>${message}</p>`,
        };

        try {
            await sgMail.send(content);
        } catch (error) {
            console.error(error);
        }

        return NextResponse.json({ status: 'success', message: 'Message sent successfully.' });
    } catch (error) {
        console.error(error);
    }
}