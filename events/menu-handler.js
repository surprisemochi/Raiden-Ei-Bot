// Select Menu handler
module.exports = {
    name: 'interactionCreate',

    async execute(interaction) {

        if(!interaction.isSelectMenu()) return;

        const menu = interaction.client.menus.get(interaction.customId);
        if(!menu) return;

        try {
            await menu.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `There was an error while executing this menu!\n\`\`\`${error}\`\`\``, ephemeral: true });
        }
    }
}