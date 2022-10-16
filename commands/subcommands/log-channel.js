const { EmbedBuilder } = require('discord.js');
const { successEmoji, setupSetStatus } = require('../../global/global-var');

const subcmd_logs = async(interaction) => {
    
    logChannel = await interaction.options.getChannel("canale");
    setupObj.log_ch = true;

    const setupEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`${successEmoji} Fatto!`)
            .addFields(
                {name: 'Canale Log:', value: `${logChannel} (${logChannel.id})`, inline: true},
            )
            .setTimestamp()
    setupSetStatus(setupEmbed);

    return interaction.reply({embeds: [setupEmbed]});
}

module.exports = { subcmd_logs }