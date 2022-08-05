const { EmbedBuilder } = require('discord.js');
const { kickLogCreate, dmErrorCreate, setupEnd } = require('../global/global-var');

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

        // If the member does not have one of the mandatory roles: send notice.
        if(hasRole == false) {
            
            const mandRolesEmbed = new EmbedBuilder()
                .setColor('Yellow')
                .setTitle(`${warningEmoji} Non hai selezionato i ruoli obbligatori!`)
                .setDescription(`Per selezionare i ruoli recati nell'apposito [canale](https://discord.com/channels/835975262172479518/836158256975314954/998684871352406026).`)    // TODO: make it non guild based
                .setTimestamp()
                .setFooter({text: `Kick automatico da ${member.guild.name} tra: ${kickTime/60000} min`})

            const dmErrorEmbed2 = dmErrorCreate(member);

            setTimeout(() => {
                member.send({embeds: [mandRolesEmbed]})
                    .catch(() => logChannel.send({embeds: [dmErrorEmbed2]}));
            }, kickTime/2);

            const kickEmbed = new EmbedBuilder()
                    .setColor('Red')
                    .setTitle(`Sei stato/a kickato da ${member.guild.name} :\(`)
                    .setDescription('Se pensi che si tratti di un errore contattaci.')
                    .setTimestamp()

            setTimeout(() => {
                mandRole.forEach(find => {
                    if(!member.roles.cache.some(r => r.id === find.id)) {
                        member.send({embeds: [kickEmbed]})
                            .catch(() => logChannel.send({embeds: [dmErrorEmbed2]}));   // Causes issues (multiple logs)
                        member.kick('User failed to pick mandatory roles.');
                    }
                })
                const kickLog2 = kickLogCreate(member);
                return logChannel.send({embeds: [kickLog2]});
            }, kickTime);
        }
    }
}