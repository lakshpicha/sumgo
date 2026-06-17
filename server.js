const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
require('dotenv').config();


const studentRoutes = require('./routes/studentRoutes');
const teacherRoutes = require('./routes/teacherRoutes');
const courseRoutes = require('./routes/courseRoutes');
const departmentRoutes = require('./routes/departmentRoutes');
const bookRoutes = require('./routes/bookRoutes');
const authRoutes = require('./routes/authRoutes');
const app = express();


app.use(cors());
app.use(express.json());


connectDB();

app.use('/auth', authRoutes);
app.use('/student', studentRoutes);
app.use('/', teacherRoutes);
app.use('/', courseRoutes);
// app.use('/', departmentRoutes);
app.use('/', bookRoutes);


app.get('/', (req, res) => {
  res.status(200).json({
    success: true,
    message: 'Server is running successfully',
    version: '1.0.0',
  });
});


// app.use((req, res) => {
//   res.status(404).json({
//     success: false,
//     message: 'Route not found',
//   });
// });


app.use((err, req, res, next) => {
  console.error('Error:', err);
  res.status(500).json({
    success: false,
    message: 'Internal server error',
    error: err.message,
  });
});


const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✓ Server running successfully on port ${PORT}`);
  console.log(`✓ API is ready to accept requests`);
}); 



