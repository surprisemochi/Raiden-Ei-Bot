// Returns the log embed to use further in the code.
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
    name: 'guildMemberUpdate',

    execute(oldMember, newMember) {
        if(global.targetRole == null) return console.error('Target not set. MemberUpdate ignored.');

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