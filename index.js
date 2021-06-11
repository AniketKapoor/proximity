const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const userRouter = require('./src/routers/user.routers');
const courseRouter= require ('./src/routers/courses.routers');
const subjectRouter= require('./src/routers/subject.routers');
const tagRouter= require('./src/routers/tag.routers')
const app = express();
const port = process.env.port || 4000;
app.use(bodyParser.json());
app.use('/api/v1/user', userRouter);
app.use('/api/v1/courses', courseRouter);
app.use('/api/v1/subjects', subjectRouter);
app.use('/api/v1/tags', tagRouter);
app.listen(port, () => { console.log(`Server is listening on port ${port}`); });
