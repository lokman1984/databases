const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
  database: 'transaction',
});

const connect = util.promisify(connection.connect.bind(connection));
const executeQuery = util.promisify(connection.query.bind(connection));

async function seedDatabase() {
  const tables = {
    account: [
      { account_number: 'NL00000000101', balance: 5000.0 },
      { account_number: 'NL00000000102', balance: 7000.0 },
      { account_number: 'NL00000000103', balance: 11000.0 },
    ],
    account_changes: [
      {
        account_number: 'NL00000000101',
        amount: 1000,
        changed_date: '2020-01-01',
        remark: 'Something',
      },
      {
        account_number: 'NL00000000102',
        amount: -1000,
        changed_date: '2020-01-01',
        remark: 'Something',
      },
    ],
  };

  try {
    await connect();
    await Promise.all(
      Object.keys(tables).map(entity => {
        tables[entity].map(async entityInstance => {
          await executeQuery(`INSERT INTO ${entity} SET ?`, entityInstance);
        });
      }),
    );

    connection.end();
  } catch (error) {
    console.log(error);
    connection.end();
  }
}

seedDatabase();