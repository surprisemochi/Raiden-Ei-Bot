const { EmbedBuilder } = require('discord.js');
const { botVersion } = require('../global/global-var');

module.exports = {
    data: {name: 'search-button'},

    execute(interaction) {
        
        const searchimg = new EmbedBuilder()
            .setColor('DarkPurple')
            .setTitle('Utilizzo di /search')
            .setImage('attachment://search_screenshot.png')
            .setFooter({text: `${interaction.client.user.username} ${botVersion}`})

        return interaction.update({embeds: [searchimg], files: ['./img/search_screenshot.png']});
    }
}