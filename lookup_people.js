const args = process.argv;
const nameFP = args[2];

const pg = require("pg");
const settings = require("./settings"); // settings.json

const client = new pg.Client({
  user     : settings.user,
  password : settings.password,
  database : settings.database,
  host     : settings.hostname,
  port     : settings.port,
  ssl      : settings.ssl
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

client.connect((err) => {
  if (err) {
    return console.error("Connection Error", err);
  }
  console.log("Searching ...");
  client.query("SELECT * FROM famous_people WHERE first_name = $1::text OR last_name = $1::text", [nameFP], (err, result) => {
    if (err) {
      return console.error("error running query", err);
    }
    foundPeople(result.rows);
    client.end();
  });
});

