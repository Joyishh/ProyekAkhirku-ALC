import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import userRoute from './src/routes/userRoute.js'
import authRoute from './src/routes/authRoute.js';
import subjectRoute from './src/routes/subjectRoute.js'
import packageRoute from './src/routes/packageRoute.js'
import packageItemRoute from './src/routes/packageItemRouter.js'

import Package from './src/models/packageModel.js';
import PackageItem from './src/models/packageItemModel.js';
import Subject from './src/models/subjectModel.js';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors(
    { origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE'],
        allowedHeaders: ['Content-Type', 'Authorization'] }
));
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Server is running!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

//route
app.use('/auth', authRoute)
app.use('/user', userRoute)
app.use('/subject', subjectRoute)
app.use('/package', packageRoute)
app.use('/package-item', packageItemRoute)

// Inisialisasi asosiasi antar model
Package.associate({ PackageItem });
PackageItem.associate({ Package, Subject });

