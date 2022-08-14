const { EmbedBuilder } = require('discord.js');
const { botVersion } = require('../../global/global-var');

async function search_option(interaction) {
    const searchimg = new EmbedBuilder()
            .setColor('DarkPurple')
            .setTitle('Utilizzo di /search')
            .setImage('attachment://search_screenshot.png')
            .setFooter({text: `${interaction.client.user.username} ${botVersion}`})

    await interaction.update({embeds: [searchimg], files: ['./img/search_screenshot.png']});
}

module.exports = {search_option};