// Button handler
module.exports = {
    name: 'interactionCreate',

    async execute(interaction) {

        if(!interaction.isButton()) return;

        const button = interaction.client.buttons.get(interaction.customId);
        if(!button) return;

        try {
            await button.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `There was an error while executing this button!\n\`\`\`${error}\`\`\``, ephemeral: true });
        }
    }
}