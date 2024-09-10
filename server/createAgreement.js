const axios = require('axios');
const bkashConfig = require("./config/bkashconfig.json");
const { authHeaders } = require('./authHeaders.js');

const createAgreement = async () => {
    try {
        const headers = await authHeaders();

        const requestData = {
            mode: "0000",
            callbackURL: "http://localhost:3000/api/execute-agreement",
            payerReference: "0173499999",
        };

        const response = await axios.post(bkashConfig.create_agreement_url, requestData, {
            headers: headers,
        });

        console.log('Response Data:', response.data);

        const { bkashURL, successCallbackURL, failureCallbackURL, cancelledCallbackURL } = response.data;

        if (!successCallbackURL) {
            throw new Error('Missing successCallbackURL in response data');
        }

        return {
            redirectURL: successCallbackURL, 
            bkashURL
        };
    } catch (error) {
        console.error('Failed to create agreement:', error.response ? error.response.data : error.message);
        throw new Error('Failed to create agreement');
    }
};

module.exports = createAgreement;
