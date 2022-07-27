const express = require('express');
const cors = require('cors');

const app = express();

app.use(cors());

app.use('/api/users', (req, res, next) => {
    const users = [
        {
            _id: 'oeihfzeoi',
            emailLogin: 'toto@chezmoi.com',
            passwordLogin: 'test',
        },
        {
            _id: 'gzertgyhzt',
            emailLogin: 'truc@muche.com',
            passwordLogin: 'test',
        },
    ];
    res.status(200).json(users);
});

module.exports = app;