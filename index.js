/*
*   Raiden Ei Bot
*   Developed with love by Sofia (surprisemochi#1708)
*/

const { Client, Intents, MessageEmbed, MessageActionRow, MessageButton } = require('discord.js');
const { token } = require('./config.json');

const client = new Client({ intents: [Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_INTEGRATIONS,
    Intents.FLAGS.GUILD_MEMBERS] });
    
let targetRole, logChannel, kickTime = null;
let mandRole = [];

const raidenColour = 'DARK_PURPLE';
const successEmoji = "<a:bot_success:522080656604397591>";
const alertEmoji = "<a:bot_alert:997448756398129222>";
const warningEmoji = "<:bot_warning:994288250858508369>";

client.once("ready", () => {
    console.log(`Logged in as ${client.user.tag}.`);
    client.user.setActivity('la chat', { type: 'WATCHING' });

    // Bot Slash Commands.
    client.guilds.cache.forEach(guild => {

        guild.commands.create({
            name: "help",
            description: "Informazioni sul bot ed il suo funzionamento."
        });

        guild.commands.create({
            name: "setupinfo",
            description: "Ruolo target e Canale log corrente."
        });

        guild.commands.create({
            name: "setup",
            description: "Per selezionare il ruolo target.",
            options: [
                {
                    name: "target",
                    description: "L'id del ruolo target",
                    type: "ROLE",
                    required: true
                },
                {
                    name: "canale",
                    description: "Il canale dove il bot invierà i log.",
                    type: "CHANNEL",
                    required: true
                },
                {
                    name: "kicktime",
                    description: "Il countdown per il kick (in minuti)",
                    type: "NUMBER",
                    required: false
                }
            ]
        });

        guild.commands.create({
            name: "mandatoryroles",
            description: "Per settare i ruoli obbligatori.",
            options: [
                {
                    name: "ruolo1",
                    description: "Il ruolo obbligatorio #1",
                    type: "ROLE",
                    required: true
                },
                {
                    name: "ruolo2",
                    description: "Il ruolo obbligatorio #2",
                    type: "ROLE",
                    required: true
                },
                {
                    name: "ruolo3",
                    description: "Il ruolo obbligatorio #3",
                    type: "ROLE",
                    required: true
                },
                {
                    name: "ruolo4",
                    description: "Il ruolo obbligatorio #4",
                    type: "ROLE",
                    required: true
                },
                {
                    name: "ruolo5",
                    description: "Il ruolo obbligatorio #5",
                    type: "ROLE",
                    required: true
                },
            ]
        });
    });
});

client.on("interactionCreate", async(intr) => {
    const selfProfile = await client.users.fetch('806585589826453504');
    
    // The interaction is not a command.
    if(!intr.isCommand()) return;

    if(intr.commandName == "help") {
        const helpEmbed = new MessageEmbed()
            .setColor(`${raidenColour}`)
            .setThumbnail(`${client.user.displayAvatarURL()}`)
            .setTitle(`Guida all'utilizzo di ${client.user.username}.`)
            .setDescription('Esegui i seguenti passaggi per settare il bot:')
            .addFields(
                {name: `${alertEmoji} /setup`, value: 'Con il comando /setup selezionerai il Ruolo Target ed il canale dei log.'},
                {name: `${alertEmoji} /mandatoryroles`, value: `Selezionerai i ruoli obbligatori che l'utente dovrà avere.`},
                {name: `${successEmoji} Fine!`, value: `Il bot è pronto per l'utilizzo.`},
            )
            .setFooter(
                {text: `v1.0 | Developed with ❤️ by ${selfProfile.tag}`,
                iconURL: `${selfProfile.displayAvatarURL()}`}
            )

        return intr.reply({embeds: [helpEmbed]});

    } else if(intr.commandName == "setup") {
        if(!intr.member.permissions.has("MANAGE_GUILD")) {
            return intr.reply({content: "Non hai i permessi per eseguire il comando.", ephemeral: true});
        }

        targetRole = intr.options.getRole("target");
        logChannel = intr.options.getChannel("canale");
        kickTime = intr.options.getNumber("kicktime") * 60000;

        // Default kick time: 1 minute.
        if(kickTime == null || kickTime <= 0) kickTime = 60000;

        if(logChannel.type !== "GUILD_TEXT") return intr.reply(
            {content: `${warningEmoji} **| ${logChannel} non è un canale testuale, riprova.**`, ephemeral: true}
        );

        const setupEmbed = new MessageEmbed()
            .setColor(`${raidenColour}`)
            .setTitle(`${successEmoji} Fatto!`)
            .addFields(
                {name: 'Ruolo Target:', value: `${targetRole} (${targetRole.id})`, inline: true},
                {name: 'Canale Log:', value: `${logChannel} (${logChannel.id})`, inline: true},
                {name: 'Kick Time:', value: `${kickTime/60000} min`, inline: false},
            )
            .setTimestamp()
            .setFooter(
                {text: `Developed with ❤️ by ${selfProfile.tag}`,
                iconURL: `${selfProfile.displayAvatarURL()}`}
            )

        return intr.reply({embeds: [setupEmbed]});

    } else if(intr.commandName == "setupinfo") {

        if(targetRole == null || logChannel == null) return intr.reply(
            {content: `${warningEmoji} **| Ruolo Target e/o Canale Log non settati, hai eseguito /setup?**`, ephemeral: true}
        );

        const setInfoEmbed = new MessageEmbed()
            .setColor(`${raidenColour}`)
            .setTitle(`Setup corrente:`)
            .addFields(
                {name: 'Ruolo Target:', value: `${targetRole} (${targetRole.id})`, inline: true},
                {name: 'Canale Log:', value: `${logChannel} (${logChannel.id})`, inline: true},
                {name: 'Kick Time:', value: `${kickTime/60000} min`, inline: false},
            )
            .setTimestamp()
            .setFooter(
                {text: `Developed with ❤️ by ${selfProfile.tag}`,
                iconURL: `${selfProfile.displayAvatarURL()}`}
            )
        
        return intr.reply({embeds: [setInfoEmbed], ephemeral: true});

    } else if(intr.commandName == "mandatoryroles") {

        // Pre-increment because of the Option's names. (See interaction).
        for(let i = 0; i < 5; i++) {
            mandRole[i] = intr.options.getRole(`ruolo${++i}`);
            i--;
            console.log('New Mandatory role have been set:');
            console.log(`${mandRole[i]} | index: ${i}\n`);
        }

        const mandRoleEmbed = new MessageEmbed()
            .setColor(`${raidenColour}`)
            .setTitle(`${successEmoji} Fatto!`)
            .addField('Ruoli Obbligatori:', `${mandRole[0]}\n${mandRole[1]}\n${mandRole[2]}\n${mandRole[3]}\n${mandRole[4]}\n`)
            .setTimestamp()
            .setFooter(
                {text: `Developed with ❤️ by ${selfProfile.tag}`,
                iconURL: `${selfProfile.displayAvatarURL()}`}
            )
        
        return intr.reply({embeds: [mandRoleEmbed]});
    }
})

client.on("guildMemberUpdate", function(oldMember, newMember) {

    if(targetRole == null) return console.error('Target not set. MemberUpdate ignored.');

    // Setting the reason
    if(newMember.permissions.has("MANAGE_GUILD")) {
        let reason = `${newMember.user} ha i permessi MANAGE_GUILD`;
    } else {
        reason = 'Prova a controllare se ho tutti i permessi necessari'+
        'e se il mio ruolo si trova al di sopra dei ruoli da kickare!';
    }

    // When the targeted role gets selected
    if(!oldMember.roles.cache.has(targetRole.id) && newMember.roles.cache.has(targetRole.id)){
        if(!newMember.kickable) {
            const kickError = new MessageEmbed()
                .setColor('RED')
                .setTitle(`${warningEmoji} Impossibile kickare ${newMember.user.tag}`)
                .setDescription(`${reason}`)
                .setThumbnail(`${newMember.user.displayAvatarURL()}`)
                .setTimestamp()
            logChannel.send({embeds: [kickError]});
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

            const kickNoticeEmbed = new MessageEmbed()
                .setColor('YELLOW')
                .setTitle(`${warningEmoji} Ops! Il nostro team ha rilevato un problema...`)
                .setDescription(`Pare che tu abbia selezionato il ruolo 17-.\n` +
                `Putroppo il server è strettamente 18+, ci scusiamo per il disagio!`)
                .setTimestamp()
                .setFooter({text: `Kick automatico da ${newMember.guild.name} tra: ${kickTime/60000} ${min}`})

            newMember.send({embeds: [kickNoticeEmbed]});

            const kickEmbed = new MessageEmbed()
                .setColor('RED')
                .setTitle(`Sei stato/a kickato da ${newMember.guild.name} :\(`)
                .setDescription(' Se pensi che si tratti di un errore contattaci.')
                .setTimestamp()
            
            const kickLog = new MessageEmbed()
                .setColor(`${raidenColour}`)
                .setTitle('Membro kickato')
                .setAuthor({
                    name: `${newMember.user.tag}`,
                    iconURL: `${newMember.user.displayAvatarURL()}`
                })
                .addFields(
                    {name: 'Nome:', value: `${newMember.user}`, inline: true},
                    {name: 'ID:', value: `${newMember.user.id}`, inline: true},
                )
                .setThumbnail(`${newMember.user.displayAvatarURL()}`)
                .setTimestamp()
            
            setTimeout(() => {

                newMember.send({embeds: [kickEmbed]});
                newMember.kick();
                logChannel.send({embeds: [kickLog]});
                console.log(`${newMember.user.tag} was kicked because they had the targeted role ${targetRole}`);
            }, kickTime);
        }
    }
})

client.on("guildMemberAdd", member => {

    // If the new member is a bot, ignore.
    if(member.user.bot) return;

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
        
        const mandRolesEmbed = new MessageEmbed()
            .setColor('YELLOW')
            .setTitle(`${warningEmoji} Non hai selezionato i ruoli obbligatori!`)
            .setDescription(`Per selezionare i ruoli recati nell'apposito canale.`)
            .setTimestamp()
            .setFooter({text: `Messaggio da ${member.guild.name}`})

        member.send({embeds: [mandRolesEmbed]});
    }
})

client.login(token);