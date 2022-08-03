const { SlashCommandBuilder, PermissionFlagsBits } = require('discord.js');
const { EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { warningEmoji, raidenColour } = require('../global/global-var');

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

            // No target or mandatory role(s) error. FIX
            if(targetRole == null || mandRole.length === 0) {
                return interaction.reply(
                    {content: `${warningEmoji} **| Ruoli non settati correttamente.**`, ephemeral: true} );
            }

            let userNumber = 0;
            let hasRoleList = new Array();

            // Checks the number of members that have the target role / do not have the mandatory roles.
            if(interaction.options.getSubcommand() === 'target-role') {

                targetRole.members.forEach(user => {
                    if(!user.user.bot) {
                        kickList.push(user);
                        userNumber++;
                    }
                })

            } else {
                
                // Fetching all the guild members and then removing the bots.
                let fetchMembers = await interaction.guild.members.fetch();
                fetchMembers = fetchMembers.filter(member => !member.user.bot);

                // Pushes in the hasRoleList array that cointains all the users that have the mandatory roles.
                mandRole.forEach(role => {
                    role.members.forEach(user => {
                        if(!user.user.bot) {
                            if(user.roles.cache.some(rl => rl.id === role.id)) {
                                hasRoleList.push(user);
                            }
                        }
                    })
                })
                
                /* Creates a Set of the members with mandatory roles and removes them from the kickList array.
                   Now kickList contains only the remaining members that have to be kicked. */
                const usersToDelete = new Set(hasRoleList);

                kickList = fetchMembers.filter(user => !usersToDelete.has(user));
                userNumber = kickList.size;
            }

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