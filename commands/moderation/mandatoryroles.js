const { MessageEmbed, SlashCommandBuilder } = require('discord.js');

module.exports = {
    // name: 'mandatoryroles',
    // data: {
    //     name: "mandatoryroles",
    //     description: "Per settare i ruoli obbligatori.",
    //     options: [
    //         {
    //             name: "ruolo1",
    //             description: "Il ruolo obbligatorio #1",
    //             type: "ROLE",
    //             required: true
    //         },
    //         {
    //             name: "ruolo2",
    //             description: "Il ruolo obbligatorio #2",
    //             type: "ROLE",
    //             required: true
    //         },
    //         {
    //             name: "ruolo3",
    //             description: "Il ruolo obbligatorio #3",
    //             type: "ROLE",
    //             required: true
    //         },
    //         {
    //             name: "ruolo4",
    //             description: "Il ruolo obbligatorio #4",
    //             type: "ROLE",
    //             required: true
    //         },
    //         {
    //             name: "ruolo5",
    //             description: "Il ruolo obbligatorio #5",
    //             type: "ROLE",
    //             required: true
    //         },
    //     ]
    // },

    data: new SlashCommandBuilder()
        .setName('mandatoryroles')
        .setDescription('Per settare i ruoli obbligatori.')
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
        ),

    async execute(interaction) {
        // Pre-increment because of the Option's names. (See interaction).
        for(let i = 0; i < 5; i++) {
            mandRole[i] = interaction.options.getRole(`ruolo${++i}`);
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
        
        return interaction.reply({embeds: [mandRoleEmbed]});
    }
}