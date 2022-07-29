const { EmbedBuilder } = require('discord.js');

const subcmd_info = async (interaction) => {
    
    if(global.targetRole == null || global.logChannel == null) return interaction.reply(
        {content: `${warningEmoji} **| Ruolo Target e/o Canale Log non settati, hai eseguito /setup?**`, ephemeral: true}
    );

    const setInfoEmbed = new EmbedBuilder()
        .setColor(`${raidenColour}`)
        .setTitle(`Setup corrente:`)
        .addFields(
            {name: 'Ruolo Target:', value: `${targetRole} (${targetRole.id})`, inline: true},
            {name: 'Canale Log:', value: `${logChannel} (${logChannel.id})`, inline: true},
            {name: 'Kick Time:', value: `${kickTime/60000} min`, inline: false},
        )
        .setTimestamp()
        .setFooter(
            {text: `Developed with ❤️ by ${selfProfile.tag}`,
            iconURL: `${selfProfile.displayAvatarURL()}`}
        )
    
    return interaction.reply({embeds: [setInfoEmbed], ephemeral: true});
}

module.exports = { subcmd_info }