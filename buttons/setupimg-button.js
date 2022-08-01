const { EmbedBuilder } = require('discord.js');

module.exports = {
    data: {name: 'setup-button'},

    execute(interaction) {

        const setupimg = new EmbedBuilder()
            .setColor('DarkGreen')
            .setImage('attachment://setup_screenshot.png')

            
        return interaction.update({embeds: [setupimg], files: ['./img/setup_screenshot.png']});
    }
}