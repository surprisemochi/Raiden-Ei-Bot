const { ActivityType } = require('discord.js');

module.exports = {
    name: 'ready',
    once: true,

    execute(client) {
        console.log(`Logged in as ${client.user.tag}.`);
        client.user.setActivity('la chat', { type: ActivityType.Watching });
    }
}