const express = require('express');
const dotenv = require('dotenv');

dotenv.config({path: './config/config.env'})
const connectDB = require('./config/db')

const app = express();

connectDB();



app.use(express.json());

app.use('/api/v1/auth', require('./routes/api/v1/auth'));
app.use('/api/v1/books', require('./routes/api/v1/books'))
app.use(require('./middleware/errorHandler.js')); 
const server = app.listen(process.env.PORT, ()=> {
    console.log(`Server listening on port ${process.env.PORT}`);
});



process.on('unhandledRejection', (reason, promise) => {
    console.log('An Error Occurred', reason);
    server.close()
    process.exit(1);
})