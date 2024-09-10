const axios = require('axios');
const bkashConfig = require("./config/bkashconfig.json");
const { authHeaders } = require('./authHeaders.js');

const queryAgreement = async (agreementID) => {
    try {
        const headers = await authHeaders();

        console.log('Authorization Header:', headers.authorization);

        const requestData = {
            agreementID: agreementID,
        };

        const response = await axios.post(bkashConfig.query_agreement_url, requestData, {
            headers: headers,
        });

        console.log('Query Agreement Response Data:', response.data);

        if (response.data.statusCode === '0000') {
            return response.data;
        } else {
            throw new Error(`Agreement query failed with status code: ${response.data.statusCode}`);
        }
    } catch (error) {
        console.error('Failed to query agreement:', error.response ? error.response.data : error.message);
        throw new Error('Failed to query agreement');
    }
};

module.exports = queryAgreement;