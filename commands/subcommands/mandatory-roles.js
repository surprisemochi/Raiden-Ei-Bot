const { EmbedBuilder } = require('discord.js');

const subcmd_mandRoles = (interaction) => {
    
    // Pre-increment because of the Option's names. (See interaction).
    for(let i = 0; i < 5; i++) {
        mandRole[i] = interaction.options.getRole(`ruolo${++i}`);
        i--;
        console.log('New Mandatory role have been set:');
    }
    console.log(mandRole);

    const mandRoleEmbed = new EmbedBuilder()
        .setColor(`${raidenColour}`)
        .setTitle(`${successEmoji} Fatto!`)
        .addFields(
            {name: 'Ruoli Obbligatori:', value: `${mandRole[0]}\n${mandRole[1]}\n${mandRole[2]}\n${mandRole[3]}\n${mandRole[4]}\n`}
        )
        .setTimestamp()
        .setFooter(
            {text: `Developed with ❤️ by ${selfProfile.tag}`,
            iconURL: `${selfProfile.displayAvatarURL()}`}
        )
    
    return interaction.reply({embeds: [mandRoleEmbed]});
}

module.exports = { subcmd_mandRoles }