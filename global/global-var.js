const { EmbedBuilder } = require('discord.js');

// Boolean object to check if the setup is complete.
globalThis.setupObj = {
    target_role: false,
    mandatory_roles: false,
    kick_time: false,
    log_channel: false,
};
// Omits kick_time property from the search.
let {kick_time, ...searchObj} = setupObj;
// Checks if the setup is complete (all object's values are true, kick_time is omitted).
const setupEnd = Object.values(searchObj).every(value => value === true);

// Creates the embed status.
function setupSetStatus(inputEmbed) {
    if(!inputEmbed) return;
    let setupArray = new Array();

    Object.entries(setupObj).forEach(entry => {
        const [key, value] = entry;

        // Special case: kick_time (has a default setting)
        if(key === 'kick_time' && !value) {
            setupArray.push(`\`🟡 ${key} \``)
        } else {
            value ? setupArray.push(`\`🟢 ${key} \``) : setupArray.push(`\`🔴 ${key} \``);
        }
    })

    const line = setupArray.join(' ');
    return inputEmbed.addFields({name: 'Stato del completamento del setup:', value: `${line}`});
}

// Other global variables.
const botVersion = 'v1.0';
const raidenColour = 'DarkPurple';
globalThis.targetRole, globalThis.logChannel = null;
globalThis.mandRole = new Array();
globalThis.kickTime = 60000;
globalThis.kickList = new Array();

const successEmoji = '<a:bot_success:522080656604397591>';
const alertEmoji = '<a:bot_alert:997448756398129222>';
const warningEmoji = '<:bot_warning:994288250858508369>';
const typingEmoji = '<a:bot_typing:1002938798067417159>';

// Embeds
function help_embed(interaction) {
    const helpEmbed = new EmbedBuilder()
            .setColor(`${raidenColour}`)
            .setThumbnail(`${interaction.client.user.displayAvatarURL()}`)
            .setTitle(`Guida all'utilizzo di ${interaction.client.user.username}.`)
            .setDescription(`${interaction.client.user.username} si occuperà di\
            auto-moderare i nuovi membri del server attraverso il controllo dei ruoli selezionati.\n
            Esegui i seguenti passaggi per settare il bot:`)
            .addFields(
                {
                    name: `${alertEmoji} /setup`,
                    value: '> Con il comando \`/setup <option>\` potrai impostare il _ruolo target_,\
                    i _ruoli obbligatori_, il _canale dei log_, il _countdown per il kick_\
                    e potrai visualizzare il _setup corrente_ del bot.'
                },
                {
                    name: `${alertEmoji} /search`,
                    value: `> Con il comando \`/search <option>\` potrai ricercare tutti i membri del server\
                    che non soddisfano il requisito specificato da \`<option>\`.\n> _La pulizia successiva dei\
                    membri è facoltativa._`
                },
                {
                    name: `${alertEmoji} /ping`,
                    value: `> Per visualizzare la latenza del bot.`
                },
                {
                    name: `${alertEmoji} /help`,
                    value: `> Questa pagina!`
                },
                {
                    name: `${successEmoji} Fine!`,
                    value: `> Il bot è pronto per l'utilizzo.`
                },
            )
            .setFooter(
                {
                    text: `${botVersion} | Developed with ❤️ by ${selfProfile.tag}\n⬇️ Clicca i bottoni per maggiori informazioni sui comandi ⬇️`,
                    iconURL: `${selfProfile.displayAvatarURL()}`
                }
            )
    return helpEmbed;
}

module.exports = {
    setupEnd, botVersion, raidenColour, successEmoji, alertEmoji, warningEmoji, typingEmoji,
    help_embed, setupSetStatus
};