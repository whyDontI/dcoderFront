const express = require('express');
const app = express();
const path = require('path');

app.use(express.static('./dist/dcoder-challenge'));

app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './dist/dcoder-challenge/index.html'));
});

app.listen(process.env.PORT || 8080);