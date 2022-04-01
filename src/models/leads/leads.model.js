const path = require('path');
const {readCSV} = require('../../services/csv-parser');
let leads = require('./leads.data');

async function loadLeadsData() {
    const bulkLeads = [];
    await readCSV(path.join(__dirname, '..', '..', '..', 'data', 'bulk-upload.csv')).then((data) => {
        data.forEach(bulkLeads.push);
    });
    console.log(bulkLeads);
}

loadLeadsData();

function getAllLeads(skip = 0, limit = 5) {
    return leads.slice(skip, skip+limit+1);
}

function getLeadById(id) {
    return leads.filter(l => l.id === id);
}

function deleteLead(id) {
    const lead = leads.filter(l => l.id === id);
    leads =  leads.filter(l => l.id !== id);
    let status = true;
    let message = 'success';
    console.log(id, lead)
    if(lead !== null && lead.length == 0) {
        message = `Could not find lead with id ${id}!`;
        status = false;
    }
    return {
        status,
        data: lead,
        message
    };
}

function createLead(lead) {
    lead.id = Math.random().toString(36).slice(2) + Math.random().toString(36).slice(2);
    let exists = leads.filter(l => 
        l.firstName === lead.firstName && 
        l.lastName === lead.lastName
    );
    let status = true;
    let message = 'Created';
    if(exists !== null && exists.length !== 0) {
        status = false;
        message = 'Duplicate';
        lead = exists;
    } else leads.push(lead);
    return {
        status,
        message,
        data: lead
    };
}

function updateLead(lead) {
    let ix = leads.findIndex(l => 
        l.firstName === lead.firstName && 
        l.lastName === lead.lastName
    );
    leads[ix] = lead;
}

module.exports = {
    getAllLeads,
    getLeadById,
    deleteLead,
    createLead,
    updateLead
};