const { help_embed } = require('../global/global-var');

module.exports = {
    data: {name: 'back-button'},

    async execute(interaction) {

        const receivedEmbed = help_embed(interaction);

        return interaction.update({embeds: [receivedEmbed], files: []});
    }
}