const bkashConfig = require("./config/bkashconfig.json");

let storedToken = null;

const authHeaders = async () => {  
    if (!storedToken) {
        throw new Error('Token not found');
    }

    return {
        "Content-Type": "application/json",
        Accept: "application/json",
        authorization: `Bearer ${storedToken}`, 
        "x-app-key": bkashConfig.app_key,
        "x-app-secret": bkashConfig.app_secret,
    };
};

const setToken = (token) => {
    storedToken = token;
};

module.exports = { authHeaders, setToken };
