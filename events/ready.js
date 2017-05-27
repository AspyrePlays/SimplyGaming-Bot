const chalk = require('chalk');
module.exports = client => {
	console.log(chalk.bgGreen.black('I\'m ready and connected to go!'));
	
	// Create Tables and Attempt to add non-existant guilds.
	client.sqlite.run(
		"CREATE TABLE guilds " + 
			"(id varchar(30), "+
			"prefix varchar(10), "+
			"modlog varchar(30))", 
		(err, res) => {
			//if(err) console.log(err); 
		}
	)
	client.guilds.map((guild) => {
		client.sqlite.get(`SELECT * FROM guilds WHERE id = '${guild.id}';`, (err, rows) => {
			if(rows) {
				return;
			}
			guild.client.sqlite.run(`INSERT INTO guilds VALUES ("${guild.id}", "*", "${undefined}")`, (err, res) => {
				if(err) {
					console.log(err)
					console.log("Error Inserting " + guild.id);
				} else {
					console.log("Added " + guild.id + " to database.");
				}
			});
		});
	});

};