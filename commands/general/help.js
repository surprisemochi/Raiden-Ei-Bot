const { MessageEmbed, SlashCommandBuilder } = require('discord.js');

module.exports = {
    // name: 'help',
    // data: {
    //     name: "help",
    //     description: "Informazioni sul bot ed il suo funzionamento."
    // },

    data: new SlashCommandBuilder()
        .setName('help')
        .setDescription('Informazioni sul bot ed il suo funzionamento.'),

    async execute(interaction) {
        const helpEmbed = new MessageEmbed()
            .setColor(`${raidenColour}`)
            .setThumbnail(`${client.user.displayAvatarURL()}`)
            .setTitle(`Guida all'utilizzo di ${client.user.username}.`)
            .setDescription('Esegui i seguenti passaggi per settare il bot:')
            .addFields(
                {name: `${alertEmoji} /setup`, value: 'Con il comando /setup selezionerai il Ruolo Target ed il canale dei log.'},
                {name: `${alertEmoji} /mandatoryroles`, value: `Selezionerai i ruoli obbligatori che l'utente dovrà avere.`},
                {name: `${successEmoji} Fine!`, value: `Il bot è pronto per l'utilizzo.`},
            )
            .setFooter(
                {text: `v1.0 | Developed with ❤️ by ${selfProfile.tag}`,
                iconURL: `${selfProfile.displayAvatarURL()}`}
            )

        return interaction.reply({embeds: [helpEmbed]});
    }
}