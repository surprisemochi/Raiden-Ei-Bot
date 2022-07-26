// Command handler
module.exports = {
    name: 'interactionCreate',
    
    async execute(interaction) {
        global.selfProfile = await interaction.client.users.fetch('806585589826453504');
    
        // The interaction is not a command.
        if(!interaction.isChatInputCommand()) return;

        const command = interaction.client.commands.get(interaction.commandName)
        if (!command) return

        try {
            await command.execute(interaction);
        } catch (error) {
            console.error(error);
            await interaction.reply({ content: `There was an error while executing this command!\n\`\`\`${error}\`\`\``, ephemeral: true });
        }
    }
}