const {
    getAllLeads,
    getLeadById,
    deleteLead,
    createLead,
    updateLead
} = require('../../models/leads/leads.model');

const {getPagination} = require('../../services/paging');

function httpGetAllLeads(req, res) {
    const {skip, limit} = getPagination(req.query);
    const leads = getAllLeads(skip, limit);
    return res.status(200).json({
        data: leads
    });
}

function httpGetLeadById(req, res) {
    const lead = getLeadById(req.params.id);
    return res.status(200).json({
        data: lead
    });
}

function httpCreateLead(req, res) {
    let lead = req.body.lead;
    const result = createLead(lead);
    if(!result.status) {
        res.status(409).json(result);
    }
    else res.status(201).json(result);
}

function httpCreateLeadsFromCSV(req, res) {
    // todo
}

function httpUpdateLead(req, res) {
    let newLead = req.body.lead;
    const id = req.params.id;
    let currLead = getLeadById(id);;
    if (currLead === null || currLead.length === 0) 
        return res.sendStatus(404);
    let lead = Object.assign(currLead[0], newLead);
    updateLead(lead);
    return res.sendStatus(204);
}

function httpUpdateLeadsFromCSV(req, res) {
    // todo
}

function httpDeleteLead(req, res) {
    const result = deleteLead(req.params.id);
    return res.status(200).json({data: result});
}

module.exports = {
    httpCreateLead,
    httpCreateLeadsFromCSV,
    httpDeleteLead,
    httpGetAllLeads,
    httpGetLeadById,
    httpUpdateLead,
    httpUpdateLeadsFromCSV
}