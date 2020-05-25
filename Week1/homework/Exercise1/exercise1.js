const mysql = require('mysql');
const connection = mysql.createConnection({
	host     : 'localhost',
	user     : 'hyfuser',
	password : 'hyfpassword',
  });
  
  connection.connect();
const createTables = [
	'create table Invitee (invitee_no int, invitee_name varchar(25), invited_by varchar(25))',
	'create table Room (room_no int, room_name varchar(25),floor_number int)',
	'create table Meeting (meeting_no int, meeting_title varchar(25), starting_time DATETIME, ending_time DATETIME, room_no int)'
];
for (let i in createTables) {
	console.log('Going to run ', createTables[i]);
	connection.query(createTables[i], function(error, results, fields) {
		if (error) {
			throw error;
		}
		console.log('the reply is ', results[0]);
	});
}
connection.end();