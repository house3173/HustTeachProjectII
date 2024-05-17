
// Import library
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors')

// Import from created file
require('dotenv').config()
// const authRouter = require('./routes/auth')
// const postRouter = require('./routes/post')


const connectDB = async () => {
    try {
        await mongoose.connect(`mongodb+srv://trinhvanhau2003:310703@hustteach.zjvmpvi.mongodb.net/`, {
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

// app.use('/api/auth', authRouter);
// app.use('/api/posts', postRouter);

app.get('/', (req,res) => res.send('Hello world!'));

const PORT = process.env.PORT || 5000

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
