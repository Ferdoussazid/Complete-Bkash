const axios = require('axios');
const bkashConfig = require("./config/bkashconfig.json");
const { setToken } = require('./authHeaders.js');

const grantToken = async () => {
    try {
        const response = await axios.post(bkashConfig.grant_token_url, {
            'app_key': bkashConfig.app_key,
            'app_secret': bkashConfig.app_secret,
        }, {
            headers: {
                "Content-Type": "application/json",
                Accept: "application/json",
                username: bkashConfig.username,
                password: bkashConfig.password,
            },
        });

        const token = response.data.id_token;
        setToken(token); 
        return token;
    } catch (error) {
        console.error('Failed to get grant token:', error.response ? error.response.data : error.message);
        throw new Error('Failed to get grant token');
    }
};

module.exports = grantToken;
