
// Import library
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

// Import from created file
require('dotenv').config()
const tutorRouter = require('./routes/tutor')
const subjectRouter = require('./routes/subject')
const parentsRouter = require('./routes/parents')
const classRouter = require('./routes/classes')
const waitRegisterClassRouter = require('./routes/waitclass')
const nodeClassRouter = require('./routes/nodeclass')
const evaluteTutorRouter = require('./routes/evalutetutor')
const staffRouter = require('./routes/staff')
const adminRouter = require('./routes/admin')

const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://trinhvanhau2003:310703@hustteach.zjvmpvi.mongodb.net/Hust`, {
            // useCreateIndex: true,
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
            // useFindAndModify: false
        })

        console.log('Connect mongoose sucessfull!');
    } catch (error) {
        console.log(error.message);
        process.exit(1);
    }
}

connectDB();

const app = express();
app.use(express.json())
app.use(cors())

app.use('/api/tutor', tutorRouter);
app.use('/api/subject', subjectRouter);
app.use('/api/parents', parentsRouter);
app.use('/api/classes', classRouter);
app.use('/api/waitclass', waitRegisterClassRouter);
app.use('/api/nodeclass', nodeClassRouter);
app.use('/api/evalutetutor', evaluteTutorRouter);
app.use('/api/staff', staffRouter);
app.use('/api/admin', adminRouter);
// app.use('/api/posts', postRouter);

app.get('/', (req,res) => res.send('Hello world!'));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
