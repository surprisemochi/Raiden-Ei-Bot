const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { help_embed } = require('../global/global-var');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Informazioni sul bot ed il suo funzionamento.'),

    async execute(interaction) {

        const help = help_embed(interaction);

        const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('setup-button')
                        .setLabel('/setup')
                        .setStyle(ButtonStyle.Secondary)
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('search-button')
                        .setLabel('/search')
                        .setStyle(ButtonStyle.Secondary)
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('back-button')
                        .setLabel('Indietro')
                        .setStyle(ButtonStyle.Primary)
                )

        return interaction.reply({embeds: [help], components: [row]});
    }
}