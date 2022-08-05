const { EmbedBuilder } = require('discord.js');
const { kickLogCreate, dmErrorCreate, setupEnd } = require('../global/global-var');

module.exports = {
    name: 'guildMemberUpdate',

    execute(oldMember, newMember) {
        // If setup is not completed.
        if(!setupEnd(setupObj)) return console.error('[MemberUpdate]Setup: ', setupEnd(setupObj));

        // Setting the reason
        let reason;
        if(newMember.permissions.has("MANAGE_GUILD")) {
            reason = `${newMember.user} ha i permessi MANAGE_GUILD`;
        } else {
            reason = 'Prova a controllare se ho tutti i permessi necessari'+
            'e se il mio ruolo si trova al di sopra dei ruoli da kickare!';
        }

        // When the targeted role gets selected
        if(!oldMember.roles.cache.has(targetRole.id) && newMember.roles.cache.has(targetRole.id)){
            if(!newMember.kickable) {
                const kickError = new EmbedBuilder()
                    .setColor('Red')
                    .setTitle(`${warningEmoji} Impossibile kickare ${newMember.user.tag}`)
                    .setDescription(`${reason}`)
                    .setThumbnail(`${newMember.user.displayAvatarURL()}`)
                    .setTimestamp()
                return logChannel.send({embeds: [kickError]});
            }

            // If user join time is less than 15 minutes (new user)
            const joinTime = Date.now() - newMember.joinedAt;
            if(joinTime <= 900000) {

                console.log(`Targeted role found for ${newMember.user.tag}.`);

                //sends dm and then kicks after some time.
                let min;
                if(kickTime == 60000) {
                    min = "minuto";
                } else {
                    min = "minuti";
                }

                const kickNoticeEmbed = new EmbedBuilder()
                    .setColor('Yellow')
                    .setTitle(`${warningEmoji} Ops! Il nostro team ha rilevato un problema...`)
                    .setDescription(`Pare che tu abbia selezionato il ruolo 17-.\n` +
                    `Putroppo il server è strettamente 18+, ci scusiamo per il disagio!`)
                    .setTimestamp()
                    .setFooter({text: `Kick automatico da ${newMember.guild.name} tra: ${kickTime/60000} ${min}`})

                const dmErrorEmbed = dmErrorCreate(newMember);

                newMember.send({embeds: [kickNoticeEmbed]})
                    .catch(() => logChannel.send({embeds: [dmErrorEmbed]}));

                const kickEmbed = new EmbedBuilder()
                    .setColor('Red')
                    .setTitle(`Sei stato/a kickato da ${newMember.guild.name} :\(`)
                    .setDescription('Se pensi che si tratti di un errore contattaci.')
                    .setTimestamp()
                
                const kickLog = kickLogCreate(newMember);

                // TODO
                if(newMember == null) return logChannel.send('member already left');

                setTimeout(() => {
                    newMember.send({embeds: [kickEmbed]})
                        .catch(() => logChannel.send({embeds: [dmErrorEmbed]}));
                    newMember.kick();
                    logChannel.send({embeds: [kickLog]});
                    console.log(`${newMember.user.tag} was kicked because they had the targeted role ${targetRole}`);
                    return;

                }, kickTime);
            }
        }
    }
}