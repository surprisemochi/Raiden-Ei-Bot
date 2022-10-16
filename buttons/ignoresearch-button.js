const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');
const { successEmoji } = require('../global/global-var');

module.exports = {
    data: {name: 'ignoreButton'},

    execute(interaction) {

        const ignoreEmbed = new EmbedBuilder()
            .setColor('Greyple')
            .setTitle(`${successEmoji} Interazione ignorata.`)
            .setDescription("L'interazione è stata ignorata e non è stata effettuata alcuna modifica.")
            .setTimestamp()
        
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('prune')
                    .setLabel('Pulisci')
                    .setEmoji('🗑️')
                    .setStyle(ButtonStyle.Danger)
                    .setDisabled(true)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('ignore2')
                    .setLabel('Ignora')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true)
            );

        interaction.update({embeds: [ignoreEmbed], components: [row], ephemeral: true});
    }
}