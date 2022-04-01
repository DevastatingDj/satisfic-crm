const express = require('express');
const {
    httpCreateLead,
    httpCreateLeadsFromCSV,
    httpDeleteLead,
    httpGetAllLeads,
    httpGetLeadById,
    httpUpdateLead,
    httpUpdateLeadsFromCSV
} = require('./leads.controller');

const leadsRouter = express.Router();

leadsRouter.get('/', httpGetAllLeads);
leadsRouter.get('/:id', httpGetLeadById);
leadsRouter.post('/', httpCreateLead);
leadsRouter.post('/bulk', httpCreateLeadsFromCSV);
leadsRouter.patch('/:id', httpUpdateLead);
leadsRouter.patch('/bulk', httpUpdateLeadsFromCSV);
leadsRouter.delete('/:id', httpDeleteLead);

module.exports = leadsRouter;