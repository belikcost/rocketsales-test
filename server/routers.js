const express = require('express');
const { getLeads } = require('./controllers');

const router = new express.Router();

router.get('/leads', getLeads);

module.exports = router;