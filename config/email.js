import nodemailer from 'nodemailer'

export const sendEmail = async () => {
    // 1) Create a transporter
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'ap3135198@gmail.com',
            pass: 'hbmngfidsissqhhr',
        },
    })

    // 2) Define the email options
    const mailOptions = {
        from: 'Patel Group Of Institutions <ap3135198@gmail.com>',
        to: 'pramod.devstree@gmail.com',
        subject: 'remaining block for 4th sem of M.C.A.',
        text: 'pramod, srk is deshdrohi',
        html: '<b>Shahrukh khan is a bed actor</b>',
    }

    const data = await transporter.sendMail(mailOptions)
    console.log('data', data)
}
