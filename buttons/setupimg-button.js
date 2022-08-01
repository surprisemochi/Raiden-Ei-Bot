const { EmbedBuilder } = require('discord.js');
const { botVersion } = require('../global/global-var');

module.exports = {
    data: {name: 'setup-button'},

    execute(interaction) {

        const setupimg = new EmbedBuilder()
            .setColor('DarkPurple')
            .setTitle('Utilizzo di /setup')
            .setImage('attachment://setup_screenshot.png')
            .setFooter({text: `${interaction.client.user.username} ${botVersion}`})

        return interaction.update({embeds: [setupimg], files: ['./img/setup_screenshot.png']});
    }
}