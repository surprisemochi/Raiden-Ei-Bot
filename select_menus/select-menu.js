const { home_option } = require("./source/home-option");
const { search_option } = require("./source/search-option");
const { setup_option } = require("./source/setup-option");
const { setupstatus_option } = require("./source/setupstatus-option");

module.exports = {
    data: {name: 'help-select-menu'},

    async execute(interaction) {
        
        const value = interaction.values[0];

        if(value === 'setup-option') {
            setup_option(interaction);
        } else if(value === 'search-option') {
            search_option(interaction);
        } else if(value === 'setupstatus-option') {
            setupstatus_option(interaction);
        } else if(value === 'home-option') {
            home_option(interaction);
        }
    }
}