const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {name: 'search-button'},

    execute(interaction) {
        
        const searchimg = new EmbedBuilder()
            .setColor('DarkGreen')
            .setImage('attachment://search_screenshot.png')

            
        return interaction.update({embeds: [searchimg], files: ['./img/search_screenshot.png']});
    }
}