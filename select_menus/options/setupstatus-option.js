const { EmbedBuilder } = require("@discordjs/builders");
const { setupSetStatus } = require("../../global/global-var");

async function setupstatus_option(interaction) {
    
    const embed = new EmbedBuilder()
        .setColor(0x71368A)
        .setTitle('Stato del completamento del setup')
        .setDescription(`Nei comandi di \`/setup <options>\`, verrà visualizzato un campo come questo seguente.\n
        \`🔴\` non impostato, \`🟢\` impostato , \`🟡\` impostato con valori default (setup facoltativo),\
        \`⚪\` non impostato ma facoltativo.`)

    setupSetStatus(embed);

    await interaction.update({embeds: [embed], files: []});
}
module.exports = {setupstatus_option};