"use strict";
// import nodemailer, { Transporter } from 'nodemailer';
// import { Job, JobsOptions, Queue } from 'bullmq';
// import { emailQueue } from '../cache/emailQueue';
// import { PrepareMailDataType, SendMailDataType } from '../helpers/types';
// import { configs } from '../config';
// const sendEmail = async ({
//   senderName,
//   senderEmail,
//   mailRecipients,
//   mailSubject,
//   mailBody,
// }: SendMailDataType) => {
//   try {
//     const transporter: Transporter = nodemailer.createTransport({
//       host: configs.MAIL_HOST,
//       port: 2525,
//       secure: false, // Set secure to false since STARTTLS is used
//       auth: {
//         user: configs.MAIL_USERNAME,
//         pass: configs.MAIL_PASS,
//       },
//       tls: {
//         ciphers: 'SSLv3',
//       },
//     });
//     const msg = {
//       from: `${senderName} <${senderEmail}>`,
//       to: mailRecipients,
//       subject: mailSubject,
//       html: mailBody,
//     };
//     // Create a new job and add it to the emailQueue
//     const queue = new Queue('emailQueue'); // Create a new instance of the emailQueue
//     const job = new Job<any, any, string>(
//       queue, // Pass the queue instance instead of the queue name
//       'sendEmail', // Job name
//       { senderName, senderEmail, mailRecipients, mailSubject, mailBody } // Job data
//     );
//     await emailQueue.add('sendEmail', job.data, {
//       jobId: job.id, // Set the job ID
//     } as JobsOptions); // Add the job to the queue
//     console.log(`Email job enqueued: ${job.id}`);
//   } catch (error) {
//     console.log('Email not sent');
//     console.log(error);
//     return { status: 'error', message: 'Failed to send email' };
//   }
//   return { status: 'success', message: 'Email sent successfully, job enqueued' };
// };
// export default sendEmail;
// export const prepareMail = async ({
//   mailRecipients,
//   mailSubject,
//   mailBody,
//   senderName,
//   senderEmail,
// }: PrepareMailDataType) => {
//   const _sendMail: any = await sendEmail({
//     senderName,
//     senderEmail,
//     mailRecipients,
//     mailSubject,
//     mailBody,
//   });
//   return { status: 'error', message: 'Failed to send email' };
// };
