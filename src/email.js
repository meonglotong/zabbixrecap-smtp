const nodemailer = require('nodemailer');
const fs = require('fs').promises;

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: 'johndoe@gmail.com', // Ganti dengan emailmu
    pass: 'abcdefghijklmnop'   // Ganti dengan App Password
  }
});

async function sendEmail(to, cc, pdfPath, pdfName) {
  const mailOptions = {
    from: 'johndoe@gmail.com',
    to,
    cc: cc || '',
    subject: 'Zabbix Monitoring Report',
    text: 'Berikut adalah laporan Zabbix Monitoring dalam format PDF.',
    attachments: [{ filename: pdfName, path: pdfPath }]
  };

  try {
    const info = await transporter.sendMail(mailOptions);
    console.log('Email dikirim:', info.response);
    await fs.unlink(pdfPath); // Hapus file sementara
  } catch (error) {
    console.error('Error mengirim email:', error);
    throw error;
  }
}

module.exports = { sendEmail };