const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {

    data: new SlashCommandBuilder()
        .setName('search')
        .setDescription('Trova gli utenti con il ruolo Target oppure senza ruoli obbligatori.')
        .addSubcommand(subcommand =>
            subcommand
                .setName('target-role')
                .setDescription('Ricerca gli utenti con il ruolo target. (Pulizia facoltativa)')
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('no-mandatory-roles')
                .setDescription('Ricerca gli utenti che non hanno selezionato i ruoli obbligatori. (Pulizia facoltativa)')
        )
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

        async execute(interaction) {

            // No target or mandatory role(s) error.
            if(global.targetRole == null || global.mandRole.length === 0) {
                return interaction.reply(
                    {content: `${global.warningEmoji} **| Ruoli non settati correttamente.**`, ephemeral: true} );
            }

            let userNumber = 0;
            let hasMandRole = false;
            let kickList = new Array()

            // Checks the number of members that have the target role / do not have the mandatory roles.
            if(interaction.options.getSubcommand() === 'target-role') {
                targetRole.members.forEach(user => {
                    kickList.push(user);
                    userNumber++;
                })
            } else {
                
                // TO FIX
                mandRole.forEach(find => {
                    find.members.forEach(user => {
                        if(user.roles.cache.some(role => role.id === find.id)) {
                            //hasMandRole = true;
                        }
                    })

                    // if(hasMandRole == false) {
                    //     //kickList.push(user);    //undefined
                    //     userNumber++;
                    // }
                })
            }
            console.log(kickList);

            const searchEmbed = new EmbedBuilder()
                .setColor(`${raidenColour}`)
                .setTitle(`${userNumber} Corrispondenze.`)
                .setDescription(`Sono state trovate **${userNumber}** corrispondenze per \`${interaction.options.getSubcommand()}\`.`)
                .setFooter({text: '⚠️ Procedere alla pulizia dei membri?'})
                .setTimestamp()

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('memberPruneButton')
                        .setLabel('Pulisci')
                        .setEmoji('🗑️')
                        .setStyle(ButtonStyle.Danger)
                )
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId('ignoreButton')
                        .setLabel('Ignora')
                        .setStyle(ButtonStyle.Secondary)
                );
            
            return interaction.reply({embeds: [searchEmbed], components: [row], ephemeral: true});
        }
}