const util = require('util');
const mysql = require('mysql');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'hyfuser',
  password: 'hyfpassword',
});

const connect = util.promisify(connection.connect.bind(connection));
const executeQuery = util.promisify(connection.query.bind(connection));

async function createDBandTables() {
  const createAccountTable = `CREATE TABLE IF NOT EXISTS account 
     (account_number VARCHAR(25) PRIMARY KEY,
     balance DECIMAL(8, 2)  NOT NULL)`;
  const createAccountChangesTable = `CREATE TABLE IF NOT EXISTS account_changes
     (change_number INT AUTO_INCREMENT PRIMARY KEY,
     account_number VARCHAR(25) NOT NULL ,
     amount DECIMAL(8, 2) NOT NULL,
     changed_date DATETIME NOT NULL, 
     remark VARCHAR(100), 
     CONSTRAINT FK_Account_Number FOREIGN KEY (account_number) REFERENCES account(account_number))`;

  try {
    await connect();
    await executeQuery('DROP DATABASE IF EXISTS transaction');
    await executeQuery('CREATE DATABASE IF NOT EXISTS transaction');
    await executeQuery('USE transaction');

    await Promise.all[(executeQuery(createAccountTable), executeQuery(createAccountChangesTable))];

    connection.end();
  } catch (error) {
    console.error(error);
    connection.end();
  }
}

createDBandTables();