/*
*   Raiden Ei Bot
*   Developed with love by Sofia (surprisemochi#1708)
*/

const { Client, GatewayIntentBits, EmbedBuilder, Collection, ActivityType } = require('discord.js');
const { token } = require('./config.json');
const fs = require('fs');
const path = require('node:path');

global.client = new Client({ intents: [
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
global.mandRole = [];

global.raidenColour = 'DarkPurple';
global.successEmoji = "<a:bot_success:522080656604397591>";
global.alertEmoji = "<a:bot_alert:997448756398129222>";
global.warningEmoji = "<:bot_warning:994288250858508369>";

// Returns the log embed to use further in the code.
function kickLogCreate(member) {
    const log = new EmbedBuilder()
        .setColor('Red')
        .setTitle('Membro kickato')
        .setAuthor({
            name: `${member.user.tag}`,
            iconURL: `${member.user.displayAvatarURL()}`
        })
        .addFields(
            {name: 'Nome:', value: `${member.user}`, inline: true},
            {name: 'ID:', value: `${member.user.id}`, inline: true},
        )
        .setThumbnail(`${member.user.displayAvatarURL()}`)
        .setTimestamp()
    
    return log;
}

function dmErrorCreate(member) {
    const dmLog = new EmbedBuilder()
        .setColor('Yellow')
        .setTitle(`${warningEmoji} Impossibile inviare DM a ${member.tag}`)
        .setAuthor({
            name: `${member.user.tag}`,
            iconURL: `${member.user.displayAvatarURL()}`
        })
        .addFields(
            {name: 'Nome:', value: `${member.user}`, inline: true},
            {name: 'ID:', value: `${member.user.id}`, inline: true},
        )
        .setThumbnail(`${member.user.displayAvatarURL()}`)
        .setTimestamp()

    return dmLog;
}

// Logging the client
client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}.`);
    client.user.setActivity('la chat', { type: ActivityType.Watching });
});

// Command handler.
client.on("interactionCreate", async(interaction) => {
    global.selfProfile = await client.users.fetch('806585589826453504');
    
    // The interaction is not a command.
    if(!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName)
    if (!command) return

    try {
		await command.execute(interaction);
	} catch (error) {
		console.error(error);
		await interaction.reply({ content: 'There was an error while executing this command!', ephemeral: true });
	}
})

// Checks if the member picked the TargetRole on MemberUpdate.
client.on("guildMemberUpdate", function(oldMember, newMember) {

    if(targetRole == null) return console.error('Target not set. MemberUpdate ignored.');

    // Setting the reason
    if(newMember.permissions.has("MANAGE_GUILD")) {
        let reason = `${newMember.user} ha i permessi MANAGE_GUILD`;
    } else {
        reason = 'Prova a controllare se ho tutti i permessi necessari'+
        'e se il mio ruolo si trova al di sopra dei ruoli da kickare!';
    }

    // When the targeted role gets selected
    if(!oldMember.roles.cache.has(targetRole.id) && newMember.roles.cache.has(targetRole.id)){
        if(!newMember.kickable) {
            const kickError = new EmbedBuilder()
                .setColor('Red')
                .setTitle(`${warningEmoji} Impossibile kickare ${newMember.user.tag}`)
                .setDescription(`${reason}`)
                .setThumbnail(`${newMember.user.displayAvatarURL()}`)
                .setTimestamp()
            logChannel.send({embeds: [kickError]});
        }

        // If user join time is less than 15 minutes (new user)
        const joinTime = Date.now() - newMember.joinedAt;
        if(joinTime <= 900000) {

            console.log(`Targeted role found for ${newMember.user.tag}.`);

            //sends dm and then kicks after some time.
            let min;
            if(kickTime == 60000) {
                min = "minuto";
            } else {
                min = "minuti";
            }

            const kickNoticeEmbed = new EmbedBuilder()
                .setColor('Yellow')
                .setTitle(`${warningEmoji} Ops! Il nostro team ha rilevato un problema...`)
                .setDescription(`Pare che tu abbia selezionato il ruolo 17-.\n` +
                `Putroppo il server è strettamente 18+, ci scusiamo per il disagio!`)
                .setTimestamp()
                .setFooter({text: `Kick automatico da ${newMember.guild.name} tra: ${kickTime/60000} ${min}`})

            const dmErrorEmbed = dmErrorCreate(newMember);

            newMember.send({embeds: [kickNoticeEmbed]})
                .catch(() => logChannel.send({embeds: [dmErrorEmbed]}));

            const kickEmbed = new EmbedBuilder()
                .setColor('Red')
                .setTitle(`Sei stato/a kickato da ${newMember.guild.name} :\(`)
                .setDescription(' Se pensi che si tratti di un errore contattaci.')
                .setTimestamp()
            
            // const kickLog = new EmbedBuilder()
            //     .setColor(`${raidenColour}`)
            //     .setTitle('Membro kickato')
            //     .setAuthor({
            //         name: `${newMember.user.tag}`,
            //         iconURL: `${newMember.user.displayAvatarURL()}`
            //     })
            //     .addFields(
            //         {name: 'Nome:', value: `${newMember.user}`, inline: true},
            //         {name: 'ID:', value: `${newMember.user.id}`, inline: true},
            //     )
            //     .setThumbnail(`${newMember.user.displayAvatarURL()}`)
            //     .setTimestamp()
            
            const kickLog = kickLogCreate(newMember);

            setTimeout(() => {

                newMember.send({embeds: [kickEmbed]})
                    .catch(() => logChannel.send({embeds: [dmErrorEmbed]}));
                newMember.kick();
                logChannel.send({embeds: [kickLog]});
                console.log(`${newMember.user.tag} was kicked because they had the targeted role ${targetRole}`);
            }, kickTime);
        }
    }
})

// Checks on join (with Timeout) if the member doesn't pick the mandatory roles.
client.on("guildMemberAdd", member => {

    // If the new member is a bot, ignore.
    if(member.user.bot) return;

    let hasRole = false;
    mandRole.forEach(findRole => {
        if(findRole == null) {
            return console.error('One of the mandatory roles is null. MemberAdd event ignored.');
        } else if(member.roles.cache.some(role => role.id === findRole.id)) {
            hasRole = true;
        }
    })

    // If the member does not have one of the mandatory roles: send notice.
    if(hasRole == false) {
        
        const mandRolesEmbed = new EmbedBuilder()
            .setColor('Yellow')
            .setTitle(`${warningEmoji} Non hai selezionato i ruoli obbligatori!`)
            .setDescription(`Per selezionare i ruoli recati nell'apposito canale.`)
            .setTimestamp()
            .setFooter({text: `Kick automatico da ${member.guild.name} tra: ${kickTime/60000} min`})

        const dmErrorEmbed2 = dmErrorCreate(member);

        setTimeout(() => {
            member.send({embeds: [mandRolesEmbed]})
                .catch(() => logChannel.send({embeds: [dmErrorEmbed2]}));
        }, kickTime/2);

        setTimeout(() => {
            mandRole.forEach(find => {
                if(!member.roles.cache.some(r => r.id === find.id)) {
                    member.kick('User failed to pick mandatory roles.');
                    
                    const kickLog2 = kickLogCreate(member);
                    return logChannel.send({embeds: [kickLog2]});
                }
            })
        }, kickTime);
    }
})

client.login(token);