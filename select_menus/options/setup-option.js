const { EmbedBuilder } = require('discord.js');
const { botVersion } = require('../../global/global-var');

async function setup_option(interaction) {
    const setupimg = new EmbedBuilder()
            .setColor('DarkPurple')
            .setTitle('Utilizzo di /setup')
            .setImage('attachment://setup_screenshot.png')
            .setFooter({text: `${interaction.client.user.username} ${botVersion}`})

    await interaction.update({embeds: [setupimg], files: ['./img/setup_screenshot.png']});
}
module.exports = {setup_option};