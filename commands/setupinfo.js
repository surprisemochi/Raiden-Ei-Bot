const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');

module.exports = {
    // name: 'setupinfo',
    // data: {
    //     name: "setupinfo",
    //     description: "Ruolo target e Canale log corrente."
    // },

    data: new SlashCommandBuilder()
        .setName('setupinfo')
        .setDescription('Ruolo target e Canale log corrente.'),

    async execute(interaction) {
        if(global.targetRole == null || global.logChannel == null) return interaction.reply(
            {content: `${warningEmoji} **| Ruolo Target e/o Canale Log non settati, hai eseguito /setup?**`, ephemeral: true}
        );

        const setInfoEmbed = new EmbedBuilder()
            .setColor(`${raidenColour}`)
            .setTitle(`Setup corrente:`)
            .addFields(
                {name: 'Ruolo Target:', value: `${targetRole} (${targetRole.id})`, inline: true},
                {name: 'Canale Log:', value: `${logChannel} (${logChannel.id})`, inline: true},
                {name: 'Kick Time:', value: `${kickTime/60000} min`, inline: false},
            )
            .setTimestamp()
            .setFooter(
                {text: `Developed with ❤️ by ${selfProfile.tag}`,
                iconURL: `${selfProfile.displayAvatarURL()}`}
            )
        
        return interaction.reply({embeds: [setInfoEmbed], ephemeral: true});
    }
}