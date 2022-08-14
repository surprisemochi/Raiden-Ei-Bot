const { setup_option } = require("./options/setup-option");
const { search_option } = require("./options/search-option");
const { setupstatus_option } = require("./options/setupstatus-option");
const { home_option } = require("./options/home-option");

module.exports = {
    data: {name: 'help-select-menu'},

    async execute(interaction) {
        
        const value = interaction.values[0];

        if(value === 'setup-option') {
            await setup_option(interaction);
        } else if(value === 'search-option') {
            await search_option(interaction);
        } else if(value === 'setupstatus-option') {
            await setupstatus_option(interaction);
        } else if(value === 'home-option') {
            await home_option(interaction);
        }
    }
}