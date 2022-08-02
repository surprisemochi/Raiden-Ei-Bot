const { EmbedBuilder } = require('discord.js');
const { warningEmoji, raidenColour } = require('../../global/global-var');
let { targetRole, logChannel, mandRole, kickTime } = require('../../global/global-var');

const subcmd_info = async (interaction) => {

    // [TO FIX]: global vars are undefined or null even after assignment.
    console.log({mandRole, targetRole, logChannel})
    const mandRolesLen = Object.keys(mandRole).length;
    console.log({mandRolesLen})

    if(targetRole == null || logChannel == null || mandRolesLen === 0)
        return interaction.reply(
            {
                content: `${warningEmoji} **| Non c'è nulla da mostrare, hai eseguito i comandi /setup?**`,
                ephemeral: true
            }
    );
    
    const setInfoEmbed = new EmbedBuilder()
        .setColor(`${raidenColour}`)
        .setTitle(`Setup corrente:`)
        .addFields(
            {name: 'Ruolo Target:', value: `${targetRole} (${targetRole.id})`, inline: true},
            {name: 'Canale Log:', value: `${logChannel} (${logChannel.id})`, inline: true},
            {name: 'Ruoli Obbligatori:', value: `TBA`},
            {name: 'Kick Time:', value: `${kickTime/60000} min`, inline: false},
        )
        .setTimestamp()
        .setFooter(
            {text: `Developed with ❤️ by ${selfProfile.tag}`,
            iconURL: `${selfProfile.displayAvatarURL()}`}
        )
    
    return interaction.reply({embeds: [setInfoEmbed], ephemeral: true});
}

module.exports = { subcmd_info }