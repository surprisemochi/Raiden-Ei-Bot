const { EmbedBuilder } = require('discord.js');
const { successEmoji, setupSetStatus } = require('../../global/global-var');

const subcmd_targetRole = async(interaction) => {
    
    targetRole = await interaction.options.getRole("target");
    setupObj.target_role = true;

    const setupEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`${successEmoji} Fatto!`)
            .addFields(
                {name: 'Ruolo Target:', value: `${targetRole} (${targetRole.id})`, inline: true},
            )
            .setTimestamp()
    setupSetStatus(setupEmbed);

    return interaction.reply({embeds: [setupEmbed]});
}

module.exports = { subcmd_targetRole }