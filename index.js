/*
*   Raiden Ei Bot
*   Developed with love by Sofia (surprisemochi#1708)
*/

const { Client, GatewayIntentBits, Collection } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');
const path = require('node:path');

const client = new Client({ intents: [
    GatewayIntentBits.Guilds,
    GatewayIntentBits.GuildMessages,
    GatewayIntentBits.GuildIntegrations,
    GatewayIntentBits.GuildMembers,
]});

// Reading from folder.
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
	const filePath = path.join(commandsPath, file);
	const command = require(filePath);
	client.commands.set(command.data.name, command);
}

// Global variables used throughout the program.
global.targetRole, global.logChannel, global.kickTime = null;
global.mandRole = new Array();

global.raidenColour = 'DarkPurple';
global.successEmoji = "<a:bot_success:522080656604397591>";
global.alertEmoji = "<a:bot_alert:997448756398129222>";
global.warningEmoji = "<:bot_warning:994288250858508369>";

// Event handler.
const eventsPath = path.join(__dirname, 'events');
const eventFiles = fs.readdirSync(eventsPath).filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const filePath = path.join(eventsPath, file);
	const event = require(filePath);
	if (event.once) {
		client.once(event.name, (...args) => event.execute(...args));
	} else {
		client.on(event.name, (...args) => event.execute(...args));
	}
}

client.login(token);