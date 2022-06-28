const express = require('express');
const cors = require('cors');
const apiRouter = require('./server');
const port = 3001;
const app = express();

app.use(cors({ origin: 'http://localhost:3000' }));

app.use(express.json());

app.use('/api/contactlist', apiRouter);

app.listen(port, () => console.log(`Server is running on port ${port}...`));