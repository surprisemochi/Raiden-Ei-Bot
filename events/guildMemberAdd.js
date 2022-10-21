const { EmbedBuilder } = require('discord.js');
const { warningEmoji, hasTargetRole, kickLogCreate, dmErrorCreate, setupEnd } = require('../global/global-var');

module.exports = {
    name: 'guildMemberAdd',

    execute(member) {
        // If the new member is a bot or the setup is not finished, ignore.
        if(member.user.bot) return;
        if(!setupEnd(setupObj)) return console.error('[MemberAdd]Setup: ', setupEnd(setupObj));

        let hasRole = false;
        mandRole.forEach(findRole => {
            if(findRole == null) {
                return console.error('One of the mandatory roles is null. MemberAdd event ignored.');
            } else if(member.roles.cache.some(role => role.id === findRole.id)) {
                hasRole = true;
            }
        })

        // Ignores event if the user has picked the targeted role.
        if (hasTargetRole) return console.log(`Ignored guildMemberAdd event because ${member.user.tag} has picked the targeted role`);

        // If the member does not have one of the mandatory roles: send notice.
        if(hasRole == false) {
            
            // const rolesChannel = rolesLink || 'discord.com'; //TODO
            const mandRolesEmbed = new EmbedBuilder()
                .setColor('Yellow')
                .setTitle(`${warningEmoji} Non hai selezionato i ruoli obbligatori!`)
                // .setDescription(`Per selezionare i ruoli recati nell'apposito [canale](${rolesChannel}).`)
                .setTimestamp()
                .setFooter({text: `Kick automatico da ${member.guild.name} tra: ${kickTime/60000} min`})

            const dmErrorEmbed2 = dmErrorCreate(member);

            setTimeout(() => {
                try {
                    member.send({embeds: [mandRolesEmbed]});
                } catch (error) {
                    logChannel.send({embeds: [dmErrorEmbed2]});
                }
            }, kickTime/2);

            const kickEmbed = new EmbedBuilder()
                    .setColor('Red')
                    .setTitle(`Sei stato/a kickato da ${member.guild.name} :\(`)
                    .setDescription('Se pensi che si tratti di un errore contattaci.')
                    .setTimestamp()

            setTimeout(() => {
                if (!newMember.kickable) return logChannel.send('member already left');
                let canKick = true;
                mandRole.forEach(find => {
                    if(member.roles.cache.some(r => r.id === find.id)) {
                        canKick = false;
                    }
                })
                if (canKick) {
                    try {
                        member.send({embeds: [kickEmbed]});
                    } catch (error) {
                        logChannel.send({embeds: [dmErrorEmbed2]});
                    }
                    member.kick('User failed to pick mandatory roles.');
                    const kickLog2 = kickLogCreate(member);
                    return logChannel.send({embeds: [kickLog2]});
                }
                console.log(`${member.user.tag} took the mandatory roles.`);
            }, kickTime);
        }
    }
}