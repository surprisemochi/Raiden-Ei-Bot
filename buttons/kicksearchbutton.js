const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: {name: 'memberPruneButton'},

    execute(interaction) {

        // Kick. Pay attention while testing.
        let notKicked = 0;
        global.kickList.forEach(user => {
            if(user.kickable || !user.permissions.has('MANAGE_GUILD')) {
                user.kick('Search Pruned');
            } else {
                notKicked++;
            }
        })

        const replyEmbed = new EmbedBuilder()
            .setColor('Green')
            .setTitle(`${successEmoji} Fatto!`)
            .setDescription(`${notKicked} membri non kickati. (Per gerarchia ruoli/permessi del membro)`)
            .setTimestamp()

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('done')
                    .setLabel('Fatto!')
                    .setStyle(ButtonStyle.Success)
                    .setDisabled(true)
            )
            .addComponents(
                new ButtonBuilder()
                    .setCustomId('ignore2')
                    .setLabel('Ignora')
                    .setStyle(ButtonStyle.Secondary)
                    .setDisabled(true)
            );

        return interaction.update({embeds: [replyEmbed], components: [row], ephemeral: true});
    }
}