const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

// Load env vars
dotenv.config({path: './config/config.env'});

// Connect to database
connectDB();

const app = express();

// Use body-parser
app.use(express.json())

app.use('/api/v1/tasks/', require('./routes/tasks.js'))
app.use('/api/v1/auth/', require('./routes/auth.js'))
// Use Error Middleware
app.use(require('./middlewares/error'));


const PORT = process.env.PORT || 5000;

const server = app.listen(
    PORT,
    console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`)
);

process.on('unhandledRejection', (err, promise)=> {
    console.log(`Error: ${err.message}`)
    // Close server & exit process
    server.close();
});