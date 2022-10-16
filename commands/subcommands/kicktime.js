const { EmbedBuilder } = require('discord.js');
const { successEmoji, setupSetStatus } = require('../../global/global-var');

const subcmd_kicktime = async(interaction) => {
    
    kickTime = await interaction.options.getNumber("kicktime") * 60000;
    setupObj.kick_time = true;

    // Default kick time: 1 minute.
    if(kickTime == null || kickTime === 60000 || kickTime <= 0) {
        kickTime = 60000;
        setupObj.kick_time = false;
    }

    const setupEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`${successEmoji} Fatto!`)
            .addFields(
                {name: 'Kick Time:', value: `${kickTime/60000} min`, inline: false},
            )
            .setTimestamp()
    setupSetStatus(setupEmbed);

    return interaction.reply({embeds: [setupEmbed]});
}

module.exports = { subcmd_kicktime }