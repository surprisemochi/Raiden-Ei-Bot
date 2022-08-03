const { EmbedBuilder } = require('discord.js');
const { raidenColour, successEmoji } = require('../../global/global-var');

const subcmd_kicktime = (interaction) => {
    
    kickTime = interaction.options.getNumber("kicktime") * 60000;

    // Default kick time: 1 minute.
    if(kickTime == null || kickTime <= 0) kickTime = 60000;

    const setupEmbed = new EmbedBuilder()
            .setColor(`${raidenColour}`)
            .setTitle(`${successEmoji} Fatto!`)
            .addFields(
                {name: 'Kick Time:', value: `${kickTime/60000} min`, inline: false},
            )
            .setTimestamp()
            .setFooter(
                {text: `Developed with ❤️ by ${selfProfile.tag}`,
                iconURL: `${selfProfile.displayAvatarURL()}`}
            )

        return interaction.reply({embeds: [setupEmbed]});
}

module.exports = { subcmd_kicktime }