const { EmbedBuilder } = require('discord.js');
const { raidenColour, successEmoji } = require('../../global/global-var');
let { mandRole } = require('../../global/global-var');

const subcmd_mandRoles = (interaction) => {
    
    // Pre-increment because of the Option's names. (See interaction).
    for(let i = 1; i <= 6; i++) {
        mandRole.push(interaction.options.getRole(`ruolo${i}`));
    }
    console.log({mandRole});
    console.log(`Length: ${Object.keys(mandRole).length}`);

    const roleString = mandRole.join(' ');

    const mandRoleEmbed = new EmbedBuilder()
        .setColor(`${raidenColour}`)
        .setTitle(`${successEmoji} Fatto!`)
        .addFields(
            {name: 'Ruoli impostati:', value: `${roleString}`}
        )
        .setTimestamp()
        .setFooter(
            {text: `Developed with ❤️ by ${selfProfile.tag}`,
            iconURL: `${selfProfile.displayAvatarURL()}`}
        )

    return interaction.reply({embeds: [mandRoleEmbed]});
}

module.exports = { subcmd_mandRoles }