const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
//const { kickList } = require('../commands/search');

module.exports = {
    data: {name: 'memberPruneButton'},

    execute(interaction) {

        // ADD KICK

        const replyEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`${successEmoji} Fatto!`)
            .setDescription('Pulizia dei membri effettuata con successo.')
            .setTimestamp()

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('done')
                    .setLabel('Fatto!')
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

        interaction.update({embeds: [replyEmbed], components: [row], ephemeral: true});
    }
}