const fs = require('fs');
const path = require('path');
const csv = require('csv');

const csvFile = path.join(__dirname, '..', 'uploads', 'users.csv');

const processUser = async (prismaClient) => {
  fs.access(csvFile, fs.constants.F_OK, async (err) => {
    if (err) {
      console.error('Fichier CSV des utilisateurs non trouvé');
      process.exit(1);
    }

    await prismaClient.user.deleteMany({});

    fs.createReadStream(csvFile)
      .pipe(csv.parse({ columns: true }))
      .on('data', async (row) => {
        try {
          const birthdateFrenchFormat = row.BIRTHDATE;
          const parts = birthdateFrenchFormat.split('/');
          const birthdateEnglishFormat = `${parts[2]}-${parts[1]}-${parts[0]}`;

          await prismaClient.user.create({
            data: {
              firstname: row.FIRSTNAME,
              lastname: row.LASTNAME,
              email: row.EMAIL,
              birthdate: new Date(birthdateEnglishFormat),
            },
          });
        } catch (e) {
          console.error(e);
        }
      })
      .on('end', () => {
        console.log('Le fichier CSV des utilisateurs a été traité avec succès');
      });
  });
};

module.exports = processUser;
