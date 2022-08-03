const { EmbedBuilder } = require('discord.js');
const { warningEmoji, raidenColour, setupSetStatus, setupEnd } = require('../../global/global-var');

const subcmd_info = async(interaction) => {

    console.log('setupEnd:', setupEnd(setupObj))

    const setInfoEmbed = new EmbedBuilder()
        .setColor(`${raidenColour}`)
        .setTimestamp()

    // Setup is not complete.
    if(!setupEnd(setupObj)) {
        setupSetStatus(setInfoEmbed);
        return interaction.reply(
            {
                content: `${warningEmoji} **| Per mostrare informazioni aggiuntive completa il setup.**`,
                embeds: [setInfoEmbed], ephemeral: true
            }
        )
    }
    
    const roles = mandRole.join(' ');

    setInfoEmbed
        .setTitle(`Setup corrente:`)
        .addFields(
            {name: 'Ruolo Target:', value: `${targetRole} (${targetRole.id})`, inline: true},
            {name: 'Canale Log:', value: `${logChannel} (${logChannel.id})`, inline: true},
            {name: 'Ruoli Obbligatori:', value: `${roles}`},
            {name: 'Kick Time:', value: `${kickTime/60000} min`, inline: false},
        )
    
    return interaction.reply({embeds: [setInfoEmbed], ephemeral: true});
}

module.exports = { subcmd_info }