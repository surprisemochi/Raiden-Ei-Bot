const { SlashCommandBuilder, PermissionFlagsBits } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName('setupdemo')
        .setDescription('Il comando per il setup generale del bot.')
        .addSubcommand(subcommand => 
            subcommand
                .setName('info')
                .setDescription('Per visualizzare il setup corrente')
        )
        .addSubcommand(subcommand => 
            subcommand
                .setName('target-role')
                .setDescription('Per impostare il ruolo target')
                .addRoleOption(option =>
                    option
                        .setName('target')
                        .setDescription("L'id del ruolo target")
                        .setRequired(true)    
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('mandatory-roles')
                .setDescription('Per impostare i ruoli obbligatori')
                .addRoleOption(option =>
                    option.setName('ruolo1')
                        .setDescription('Il ruolo obbligatorio #1')
                        .setRequired(true)
                )
                .addRoleOption(option =>
                    option.setName('ruolo2')
                        .setDescription('Il ruolo obbligatorio #2')
                        .setRequired(true)
                )
                .addRoleOption(option =>
                    option.setName('ruolo3')
                        .setDescription('Il ruolo obbligatorio #3')
                        .setRequired(true)
                )
                .addRoleOption(option =>
                    option.setName('ruolo4')
                        .setDescription('Il ruolo obbligatorio #4')
                        .setRequired(true)
                )
                .addRoleOption(option =>
                    option.setName('ruolo5')
                        .setDescription('Il ruolo obbligatorio #5')
                        .setRequired(true)
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('kicktime')
                .setDescription('Il countdown per il kick (in minuti)')
                .addNumberOption(option =>
                    option
                        .setName('kicktime')
                        .setDescription('Il countdown per il kick (in minuti)')
                )
        )
        .addSubcommand(subcommand =>
            subcommand
                .setName('log-channel')
                .setDescription('Per impostare il canale dei log')
                .addChannelOption(option =>
                    option
                        .setName('canale')
                        .setDescription('Il canale dove il bot invierà i log.')
                        .setRequired(true)   
                )
        )
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

    async execute(interaction) {

        
    }
}