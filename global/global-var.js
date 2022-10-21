const { EmbedBuilder } = require('discord.js');

// Boolean object to check if the setup is completed.
globalThis.setupObj = {
    target_rl: false,
    mandatory_rl: false,
    kick_time: false,
    log_ch: false,
    roles_link: false,
};

// Checks if the setup is complete (all object's values are true, kick_time is omitted).
function setupEnd(obj) {
    // Omits kick_time property for the search.
    let {kick_time, roles_link, ...restObj} = obj;
    return Object.values(restObj).every(value => value === true);
}

// Creates the embed status.
function setupSetStatus(inputEmbed) {
    if(!inputEmbed) return;
    let setupArray = new Array();

    Object.entries(setupObj).forEach(entry => {
        const [key, value] = entry;

        // Special case: kick_time (has a default setting)
        if(key === 'kick_time' && !value) {
            setupArray.push(`\`🟡 ${key} \``)
        } else if(key === 'roles_link' && !value) {
            setupArray.push(`\`⚪ ${key} \``)
        } else {
            value ? setupArray.push(`\`🟢 ${key} \``) : setupArray.push(`\`🔴 ${key} \``);
        }
    })

    const line = setupArray.join(' ');
    return inputEmbed.addFields({name: 'Stato del completamento del setup:', value: `${line}`});
}

// Other global variables.
const botVersion = 'v1.0 beta';
const raidenColour = 'DarkPurple';
globalThis.targetRole;
globalThis.logChannel;
globalThis.mandRole = new Array();
globalThis.kickTime = 60000;
globalThis.rolesLink;
globalThis.kickList = new Array();
let hasTargetRole = false;  //FIXME

const successEmoji = '<a:bot_success:522080656604397591>';
const alertEmoji = '<a:bot_alert:997448756398129222>';
const warningEmoji = '<:bot_warning:994288250858508369>';
const typingEmoji = '<a:bot_typing:1002938798067417159>';

// Embeds
function help_embed(interaction) {
    const helpEmbed = new EmbedBuilder()
            .setColor(`${raidenColour}`)
            .setThumbnail('attachment://Emblem_Inazuma.png')
            .setTitle(`Guida all'utilizzo di ${interaction.client.user.username}.`)
            .setDescription(`${interaction.client.user.username} si occuperà di\
            auto-moderare i nuovi membri del server attraverso il controllo dei ruoli selezionati.\n
            Esegui i seguenti passaggi per settare il bot:`)
            .addFields(
                {
                    name: `⚙️  /setup`,
                    value: '> Con il comando \`/setup <option>\` potrai impostare il _ruolo target_,\
                    i _ruoli obbligatori_, il _canale dei log_, il _countdown per il kick_\
                    e potrai visualizzare il _setup corrente_ del bot.'
                },
                {
                    name: `🔍  /search`,
                    value: `> Con il comando \`/search <option>\` potrai ricercare tutti i membri del server\
                    che non soddisfano il requisito specificato da \`<option>\`.\n> _La pulizia successiva dei\
                    membri è facoltativa._`
                },
                {
                    name: `🏓  /ping`,
                    value: `> Per visualizzare la latenza del bot.`
                },
                {
                    name: `${alertEmoji}  /help`,
                    value: `> Questa pagina!`
                },
                {
                    name: `${successEmoji}  Fine!`,
                    value: `> Il bot è pronto per l'utilizzo.`
                },
            )
            .setFooter(
                {
                    text: `${botVersion} | Developed with ❤️ by ${selfProfile.tag}`,
                    iconURL: `${selfProfile.displayAvatarURL()}`
                }
            )
    return helpEmbed;
}
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

module.exports = {
    setupEnd, botVersion, raidenColour, successEmoji, alertEmoji, warningEmoji, typingEmoji, hasTargetRole,
    help_embed, setupSetStatus, kickLogCreate, dmErrorCreate
};