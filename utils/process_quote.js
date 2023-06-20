const fs = require('fs');
const path = require('path');
const csv = require('csv');

const csvFile = path.join(__dirname, '..', 'uploads', 'quotes.csv');

const processQuote = async (prismaClient) => {
  fs.access(csvFile, fs.constants.F_OK, async (err) => {
    if (err) {
      console.error('Fichier CSV des citations non trouvé');
      process.exit(1);
    }

    await prismaClient.quote.deleteMany({});

    fs.createReadStream(csvFile)
      .pipe(csv.parse({ columns: true }))
      .on('data', async (row) => {
        try {
          await prismaClient.quote.create({
            data: {
              text: row.CITATION,
              author: row.AUTEUR,
            },
          });
        } catch (e) {
          console.error(e);
        }
      })
      .on('end', () => {
        console.log('Le fichier CSV des citations a été traité avec succès');
      });
  });
};

module.exports = processQuote;
