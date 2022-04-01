const fs = require('fs');
const { parse } = require('csv-parse');

async function readCSV(filePath) {
    const leads = [];
    return await new Promise((resolve, reject) => {
        fs.createReadStream(filePath)
          .pipe(parse({
              comment: '#',
              columns: true
          }))
          .on('data', async (data) => {
            if(data)
                leads.push(data);
          })
          .on('err', (err) => {
              console.log(err);
              reject(err);
          })
          .on('end', async () => {
            console.log(`${leads.length} leads in ${filePath} found!`);
            resolve(leads);
          });
    });
}

module.exports = {
    readCSV
}