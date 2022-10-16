const { EmbedBuilder, hyperlink, bold } = require('discord.js');
const { successEmoji, setupSetStatus } = require('../../global/global-var');

const subcmd_rolesLink = (interaction) => {

    rolesLink = interaction.options.getString('link');

    //fare check validità
    if(!rolesLink.includes('discord.com/channels/'))
    return interaction.reply({content: `⚠️ ${bold('Invalid link, please try again.')}`, ephemeral: true});

    setupObj.roles_link = true;

    const linkEmbed = new EmbedBuilder()
        .setColor('Green')
        .setTitle(`${successEmoji} Fatto!`)
        .addFields({name: 'Link ai ruoli:', value: `${hyperlink('Link', rolesLink)}`})
    setupSetStatus(linkEmbed);

    return interaction.reply({embeds: [linkEmbed]});
}

module.exports = { subcmd_rolesLink };