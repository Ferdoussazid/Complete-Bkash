const axios = require('axios');
const bkashConfig = require("./config/bkashconfig.json");
const { authHeaders } = require('./authHeaders.js');

const cancelAgreement = async (agreementID) => {
    try {
        const headers = await authHeaders();

        const requestData = {
            agreementID: agreementID,
        };

        console.log('Headers:', headers);

        const response = await axios.post(bkashConfig.cancel_agreement_url, requestData, {
            headers: headers,
        });

        console.log('Cancel Agreement Response Data:', response.data);

        if (response.data.statusCode === '0000') {
            return response.data;
        } else {
            throw new Error(`Agreement cancellation failed with status code: ${response.data.statusCode}`);
        }
    } catch (error) {
        console.error('Failed to cancel agreement:', error.response ? error.response.data : error.message);
        throw new Error('Failed to cancel agreement');
    }
};

module.exports = cancelAgreement;
