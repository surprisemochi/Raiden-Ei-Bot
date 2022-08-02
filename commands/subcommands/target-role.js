const { EmbedBuilder } = require('discord.js');
const { raidenColour, successEmoji } = require('../../global/global-var');
let { targetRole } = require('../../global/global-var');

const subcmd_targetRole = (interaction) => {
    
    targetRole = interaction.options.getRole("target");

    const setupEmbed = new EmbedBuilder()
            .setColor(`${raidenColour}`)
            .setTitle(`${successEmoji} Fatto!`)
            .addFields(
                {name: 'Ruolo Target:', value: `${targetRole} (${targetRole.id})`, inline: true},
            )
            .setTimestamp()
            .setFooter(
                {text: `Developed with ❤️ by ${selfProfile.tag}`,
                iconURL: `${selfProfile.displayAvatarURL()}`}
            )

        return interaction.reply({embeds: [setupEmbed]});
}

module.exports = { subcmd_targetRole }