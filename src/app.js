const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const path = require('path');
const leadsRouter = require('./routes/leads/leads.routes');


const app = express();

// Middlewares
app.use(morgan('combined'));
app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, '..', 'public')));

// Routes
app.use('/leads', leadsRouter);
app.get('/*', (_, res) => {
    res.sendFile(path.join(__dirname, '..', 'public', 'index.html'));
});

module.exports = app;
