const express = require('express');
const router = require('./routers');
const { PORT } = require("./config");


const app = express();

app.use('/api', router);

app.listen(PORT, () => {
    console.log(`PORT ${PORT} is listening!`);
});