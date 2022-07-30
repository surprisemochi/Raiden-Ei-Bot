const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('ping')
        .setDescription('Mostra il ping del bot.'),
        
    execute(interaction) {

        const clientPing = Math.round(interaction.client.ws.ping);

        const pingEmbed = new EmbedBuilder()
            .setColor(`${raidenColour}`)
            .setAuthor( {name: `${interaction.client.user.username} ping`, iconURL: `${interaction.client.user.displayAvatarURL()}`} )
            .setDescription(`「${typingEmoji}」Ping: \`${clientPing} ms\`.`)
            .setFooter( {text: '🏓 Pong!'} )
            .setTimestamp()

        interaction.reply({embeds: [pingEmbed]});
    }
}