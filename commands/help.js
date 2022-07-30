const { EmbedBuilder, SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { botVersion } = require('../global/global-var');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Informazioni sul bot ed il suo funzionamento.'),

    async execute(interaction) {
        const helpEmbed = new EmbedBuilder()
            .setColor(`${raidenColour}`)
            .setThumbnail(`${interaction.client.user.displayAvatarURL()}`)
            .setTitle(`Guida all'utilizzo di ${interaction.client.user.username}.`)
            .setDescription(`${interaction.client.user.username} si occuperà di\
            auto-moderare i nuovi membri del server attraverso il controllo dei ruoli selezionati.\n
            Esegui i seguenti passaggi per settare il bot:`)
            .addFields(
                {
                    name: `${alertEmoji} /setup`,
                    value: '> Con il comando \`/setup <option>\` potrai impostare il _ruolo target_,\
                    i _ruoli obbligatori_, il _canale dei log_, il _countdown per il kick_\
                    e potrai visualizzare il _setup corrente_ del bot.'
                },
                {
                    name: `${alertEmoji} /search`,
                    value: `> Con il comando \`/search <option>\` potrai ricercare tutti i membri del server\
                    che non soddisfano il requisito specificato da \`<option>\`.\n> _La pulizia successiva dei\
                    membri è facoltativa._`
                },
                {
                    name: `${alertEmoji} /ping`,
                    value: `> Per visualizzare la latenza del bot.`
                },
                {
                    name: `${alertEmoji} /help`,
                    value: `> Questa pagina!`
                },
                {
                    name: `${successEmoji} Fine!`,
                    value: `> Il bot è pronto per l'utilizzo.`
                },
            )
            .setFooter(
                {
                    text: `${botVersion} | Developed with ❤️ by ${selfProfile.tag}\n⬇️ Clicca i bottoni per maggiori informazioni sui comandi ⬇️`,
                    iconURL: `${selfProfile.displayAvatarURL()}`
                }
            )

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

        return interaction.reply({embeds: [helpEmbed], components: [row]});
    }
}