const args = process.argv;
const firstName = args[2];
const lastName = args[3];
const dateOfBirth = args[4];

const settings = require("./settings"); // settings.json

const knex = require('knex')({
  client: 'pg',
  version: '7.2',
  connection: {
    host : settings.hostname,
    user : settings.user,
    password : settings.password,
    database : settings.database
  }
});

knex('famous_people').insert([{first_name: `${firstName}`, last_name: `${lastName}`, birthdate: `${dateOfBirth}`}])
    .then(() => console.log(`Data inserted: ${firstName} ${lastName} ${dateOfBirth}`))
    .catch((err) => { console.log(err); throw err })
    .finally(() => {
        knex.destroy();
    });