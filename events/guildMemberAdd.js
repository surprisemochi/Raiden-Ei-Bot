function kickLogCreate(member) {
    const log = new EmbedBuilder()
        .setColor('Red')
        .setTitle('Membro kickato')
        .setAuthor({
            name: `${member.user.tag}`,
            iconURL: `${member.user.displayAvatarURL()}`
        })
        .addFields(
            {name: 'Nome:', value: `${member.user}`, inline: true},
            {name: 'ID:', value: `${member.user.id}`, inline: true},
        )
        .setThumbnail(`${member.user.displayAvatarURL()}`)
        .setTimestamp()
    
    return log;
}
function dmErrorCreate(member) {
    const dmLog = new EmbedBuilder()
        .setColor('Yellow')
        .setTitle(`${warningEmoji} Impossibile inviare DM a ${member.user.tag}`)
        .setDescription(`L'utente verrà comunque kickato tra: ${kickTime/60000} min.`)
        .setAuthor({
            name: `${member.user.tag}`,
            iconURL: `${member.user.displayAvatarURL()}`
        })
        .addFields(
            {name: 'Nome:', value: `${member.user}`, inline: true},
            {name: 'ID:', value: `${member.user.id}`, inline: true},
        )
        .setThumbnail(`${member.user.displayAvatarURL()}`)
        .setTimestamp()

    return dmLog;
}

const { EmbedBuilder } = require('discord.js');

module.exports = {
    name: 'guildMemberAdd',

    execute(member) {
        // If the new member is a bot, ignore.
        if(member.user.bot) return;
        if(logChannel == null) return;

        let hasRole = false;
        mandRole.forEach(findRole => {
            if(findRole == null) {
                return console.error('One of the mandatory roles is null. MemberAdd event ignored.');
            } else if(member.roles.cache.some(role => role.id === findRole.id)) {
                hasRole = true;
            }
        })

        // If the member does not have one of the mandatory roles: send notice.
        if(hasRole == false) {
            
            const mandRolesEmbed = new EmbedBuilder()
                .setColor('Yellow')
                .setTitle(`${warningEmoji} Non hai selezionato i ruoli obbligatori!`)
                .setDescription(`Per selezionare i ruoli recati nell'apposito canale.`)
                .setTimestamp()
                .setFooter({text: `Kick automatico da ${member.guild.name} tra: ${kickTime/60000} min`})

            const dmErrorEmbed2 = dmErrorCreate(member);

            setTimeout(() => {
                member.send({embeds: [mandRolesEmbed]})
                    .catch(() => logChannel.send({embeds: [dmErrorEmbed2]}));
            }, kickTime/2);

            const kickEmbed = new EmbedBuilder()
                    .setColor('Red')
                    .setTitle(`Sei stato/a kickato da ${newMember.guild.name} :\(`)
                    .setDescription('Se pensi che si tratti di un errore contattaci.')
                    .setTimestamp()

            setTimeout(() => {
                mandRole.forEach(find => {
                    if(!member.roles.cache.some(r => r.id === find.id)) {
                        member.send({embeds: [kickEmbed]})
                            .catch(() => logChannel.send({embeds: [dmErrorEmbed2]}));
                        member.kick('User failed to pick mandatory roles.');
                    }
                })
                const kickLog2 = kickLogCreate(member);
                return logChannel.send({embeds: [kickLog2]});
            }, kickTime);
        }
    }
}