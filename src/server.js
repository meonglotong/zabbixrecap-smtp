const express = require('express');
const multer = require('multer');
const path = require('path');
const { sendEmail } = require('./email');

const app = express();
const upload = multer({ dest: 'uploads/' });

app.use(express.static(path.join(__dirname, '../public')));
app.use(express.json());

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

app.post('/send-email', upload.single('pdf'), async (req, res) => {
  const { email, cc } = req.body;
  const pdfPath = req.file.path;
  const pdfName = req.file.originalname;

  try {
    await sendEmail(email, cc, pdfPath, pdfName);
    res.status(200).send('Email berhasil dikirim');
  } catch (error) {
    res.status(500).send('Gagal mengirim email: ' + error.message);
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server berjalan di port ${PORT}`);
});