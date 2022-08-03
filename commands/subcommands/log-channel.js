const { EmbedBuilder, ChannelType } = require('discord.js');
const { warningEmoji, raidenColour, successEmoji, setupSetStatus } = require('../../global/global-var');

const subcmd_logs = (interaction) => {
    
    logChannel = interaction.options.getChannel("canale");
    setupObj.log_channel = true;

    if(logChannel.type !== ChannelType.GuildText) return interaction.reply(
        {content: `${warningEmoji} **| ${logChannel} non è un canale testuale, riprova.**`, ephemeral: true}
    );

    const setupEmbed = new EmbedBuilder()
            .setColor(`${raidenColour}`)
            .setTitle(`${successEmoji} Fatto!`)
            .addFields(
                {name: 'Canale Log:', value: `${logChannel} (${logChannel.id})`, inline: true},
            )
            .setTimestamp()
            .setFooter(
                {text: `Developed with ❤️ by ${selfProfile.tag}`,
                iconURL: `${selfProfile.displayAvatarURL()}`}
            )
    setupSetStatus(setupEmbed);

    return interaction.reply({embeds: [setupEmbed]});
}

module.exports = { subcmd_logs }