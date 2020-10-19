

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const config = require('config');
const PORT = config.get('port') || 5000;
const path = require('path')

app.use(express.json({ extended: true }));

app.use('/api/auth', require('./routers/auth.route'));
app.use('/api/link', require('./routers/link.routres'))
app.use('/t/', require('./routers/redirect.routers'))

if(process.env.NODE_ENV === 'prodaction') {
    app.use('/', express.static(path.join(__dirname, 'client', 'build')))

    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
} 

async function start() {
    try {
        await mongoose.connect(config.get('mongoUri'), {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true
        });
        app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
    } catch (e) {
        console.log('Server Error', e.message);
        process.exit(1);
    }
}

start();
