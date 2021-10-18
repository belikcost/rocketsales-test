const express = require('express');
const leads = require('./controllers/leads');


const router = new express.Router();

router.get('/leads', leads);

module.exports = router;