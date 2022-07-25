const { EmbedBuilder, SlashCommandBuilder, ChannelType, PermissionFlagsBits } = require('discord.js');

module.exports = {
    
    data: new SlashCommandBuilder()
        .setName('setup')
        .setDescription('Per selezionare il ruolo target.')
        .addRoleOption(option =>
            option.setName('target')
                .setDescription("L'id del ruolo target")
                .setRequired(true)
        )
        .addChannelOption(option =>
            option.setName('canale')
                .setDescription('Il canale dove il bot invierà i log.')
                .setRequired(true)   
        )
        .addNumberOption(option =>
            option.setName('kicktime')
                .setDescription('Il countdown per il kick (in minuti)')    
        )
        .setDMPermission(false)
        .setDefaultMemberPermissions(PermissionFlagsBits.ManageGuild),

    async execute(interaction) {
        if(!interaction.member.permissions.has("MANAGE_GUILD")) {
            return interaction.reply({content: "Non hai i permessi per eseguire il comando.", ephemeral: true});
        }

        targetRole = interaction.options.getRole("target");
        logChannel = interaction.options.getChannel("canale");
        kickTime = interaction.options.getNumber("kicktime") * 60000;

        // Default kick time: 1 minute.
        if(kickTime == null || kickTime <= 0) kickTime = 60000;

        if(logChannel.type !== ChannelType.GuildText) return interaction.reply(
            {content: `${warningEmoji} **| ${logChannel} non è un canale testuale, riprova.**`, ephemeral: true}
        );

        const setupEmbed = new EmbedBuilder()
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

        return interaction.reply({embeds: [setupEmbed]});
    }
}