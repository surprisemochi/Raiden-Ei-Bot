const { help_embed } = require('../../global/global-var');

async function home_option(interaction) {
    const receivedEmbed = help_embed(interaction);

    await interaction.update({embeds: [receivedEmbed], files: ['./img/Emblem_Inazuma.png']});
}
module.exports = {home_option};