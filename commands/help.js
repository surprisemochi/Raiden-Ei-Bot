const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, SelectMenuBuilder } = require('discord.js');
const { help_embed } = require('../global/global-var');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Informazioni sul bot ed il suo funzionamento.'),

    async execute(interaction) {

        const help = help_embed(interaction);

        const row = new ActionRowBuilder()
                .addComponents(
                    new SelectMenuBuilder()
                        .setCustomId('help-select-menu')
                        .setPlaceholder(`Clicca per più informazioni sul bot`)
                        .addOptions(
                            {
                                label: '/setup',
                                description: 'Informazioni sul comando /setup',
                                emoji: '⚙️',
                                value: `setup-option`
                            },
                            {
                                label: '/search',
                                description: 'Informazioni sul comando /search',
                                emoji: '🔎',
                                value: 'search-option'
                            },
                            {
                                label: 'Stato del completamento del setup',
                                description: 'Informazioni sul sistema di controllo',
                                emoji: '❓',
                                value: 'setupstatus-option'
                            },
                            {
                                label: 'Home',
                                description: 'Ritorna alla pagina /help',
                                emoji: '🏠',
                                value: 'home-option'
                            }
                        )
                )

        return interaction.reply({embeds: [help], components: [row]});
    }
}