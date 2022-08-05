const { EmbedBuilder } = require('discord.js');
const { successEmoji, setupSetStatus } = require('../../global/global-var');

const subcmd_mandRoles = async(interaction) => {
    
    // Pre-increment because of the Option's names. (See interaction).
    for(let i = 1; i <= 6; i++) {
        mandRole.push(await interaction.options.getRole(`ruolo${i}`));
    }
    setupObj.mandatory_roles = true;

    console.log({mandRole});
    console.log(`Length: ${Object.keys(mandRole).length}`);

    const roleString = mandRole.join(' ');

    const mandRoleEmbed = new EmbedBuilder()
        .setColor('Green')
        .setTitle(`${successEmoji} Fatto!`)
        .addFields(
            {name: 'Ruoli impostati:', value: `${roleString}`}
        )
        .setTimestamp()
    setupSetStatus(mandRoleEmbed);

    return interaction.reply({embeds: [mandRoleEmbed]});
}

module.exports = { subcmd_mandRoles }