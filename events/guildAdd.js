module.exports = guild => {
    guild.client.sqlite.get(`SELECT * FROM guilds WHERE id = '${guild.id}';`, (err, rows) => {
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
};