const args = process.argv;
const nameFP = args[2];

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

function foundPeople(resultFromQuery) {
  let firstName = '';
  let lastName = '';
  let dateOfBirth = '';
  let count = 0;
  console.log("Found", resultFromQuery.length, "person(s) by the name 'Paul':")
  for (let person of resultFromQuery) {
    firstName = person.first_name;
    lastName = person.last_name;
    dateOfBirth = String(person.birthdate);
    count += 1;
    console.log("-", count + ":", firstName, lastName + ", born", "'" + dateOfBirth.slice(4, 15) + "'");
  }
}

knex.from('famous_people').select("*").where('first_name', '=', `${nameFP}`, 'OR', 'last_name', '=', `${nameFP}`)
    .then((rows) => {
      console.log("Searching ...");
      foundPeople(rows);
   })
    .catch((err) => { console.log( err); throw err })
    .finally(() => {
       knex.destroy();
   });

