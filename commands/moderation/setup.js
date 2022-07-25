const { MessageEmbed, SlashCommandBuilder } = require('discord.js');

module.exports = {
    // name: 'setup',
    // data: {
    //     name: "setup",
    //     description: "Per selezionare il ruolo target.",
    //     options: [
    //         {
    //             name: "target",
    //             description: "L'id del ruolo target",
    //             type: "ROLE",
    //             required: true
    //         },
    //         {
    //             name: "canale",
    //             description: "Il canale dove il bot invierà i log.",
    //             type: "CHANNEL",
    //             required: true
    //         },
    //         {
    //             name: "kicktime",
    //             description: "Il countdown per il kick (in minuti)",
    //             type: "NUMBER",
    //             required: false
    //         }
    //     ]
    // },

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
        ),

    async execute(interaction) {
        if(!interaction.member.permissions.has("MANAGE_GUILD")) {
            return interaction.reply({content: "Non hai i permessi per eseguire il comando.", ephemeral: true});
        }

        targetRole = interaction.options.getRole("target");
        logChannel = interaction.options.getChannel("canale");
        kickTime = interaction.options.getNumber("kicktime") * 60000;

        // Default kick time: 1 minute.
        if(kickTime == null || kickTime <= 0) kickTime = 60000;

        if(logChannel.type !== "GUILD_TEXT") return interaction.reply(
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

        return interaction.reply({embeds: [setupEmbed]});
    }
}