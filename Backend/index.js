require('dotenv').config();
const app = require('./app');
const connectDB = require('./Config/database');
const cloudinary = require('cloudinary').v2;

// db connection
connectDB();

// clodunary config
cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
});

const { PORT } = process.env;

app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`);
});
