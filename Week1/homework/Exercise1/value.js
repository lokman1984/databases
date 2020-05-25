const mysql = require('mysql');
const connection = mysql.createConnection({
	host: 'localhost',
	user: 'hyfuser',
	password: 'hyfpassword',
	database: 'meetup'
});

connection.connect();

const insertQueries = [
	"insert into Invitee values (300,'Business meeting', 'Administration')",
	"insert into Invitee values (301,'Business meeting', 'Administration')",
	"insert into Invitee values (302,'Business meeting', 'Administration')",
	"insert into Invitee values (303,'Business meeting', 'Administration')",
	"insert into Invitee values (304,'Business meeting', 'Administration')",
	"insert into Room values (100,'Meeting Room', 1)",
	"insert into Room values (110,'Meeting Room', 2)",
	"insert into Room values (120,'Meeting Room', 3)",
	"insert into Room values (130,'Meeting Room', 4)",
	"insert into Room values (140,'Meeting Room', 5)",
	"insert into Meeting values (10,'Business meeting', '2020-03-01 11-00-00','2020-03-01 13-00-00',101)",
	"insert into Meeting values (11,'Business meeting', '2020-03-02 09-00-00','2020-03-02 11-00-00',101)",
	"insert into Meeting values (12,'Business meeting', '2020-03-03 12-00-00','2020-03-03 13-00-00',101)",
	"insert into Meeting values (13,'Business meeting', '2020-03-04 11-00-00','2020-03-01 12-00-00',101)",
	"insert into Meeting values (14,'Business meeting', '2020-03-05 14-00-00','2020-03-01 15-00-00',101)"
];

for (let i in insertQueries) {
	console.log('Going to run ', insertQueries[i]);
	connection.query(insertQueries[i], function(error, results, fields) {
		if (error) {
			throw error;
		}
		console.log('the reply is ', results[0]);
	});
}
connection.end();