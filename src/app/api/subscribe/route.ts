import { NextResponse } from "next/server";
import nodemailer from 'nodemailer';


export const dynamic = 'force-dynamic';

export async function POST(req: Request) {
    if (req.method === 'POST') {
        const { email } = await req.json();

        if (!email) {
            return NextResponse.json({
                success: false,
                error: true,
                message: 'Submit email not worng!'

            })

        }

        try {
            const transport = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: 'shohidulpramanik94@gmail.com',
                    pass: 'wdpp xial itsy igjp'
                }
            });

            const mailOptions = {
                from: email,
                to: "shohidulpramanik94@gmail.com",
                html: `
                <p><strong>Email:<strong/>${email}<p/>
                `
            }
            await transport.sendMail(mailOptions);
            return NextResponse.json({
                success: true,
                message: 'Submit successful'

            })

        } catch (error) {
            console.log(error)
            return NextResponse.json({ message: 'mail has not been sent' })
        }
    } else {
        return NextResponse.json({ message: 'Method is not allow' })

    }
}