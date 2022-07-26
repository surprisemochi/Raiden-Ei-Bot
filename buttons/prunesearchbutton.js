const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: {name: 'memberPruneButton'},

    execute(interaction) {
        
        const embed = new EmbedBuilder()
            .setTitle('test')

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('done')
                    .setLabel('Fatto!')
                    .setEmoji('😀')
                    .setStyle(ButtonStyle.Success)
                    .setDisabled(true)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('ignore2')
                    .setLabel('Ignora')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true)
            );

        interaction.reply({embeds: [embed], components: [row], ephemeral: true});
    }
}