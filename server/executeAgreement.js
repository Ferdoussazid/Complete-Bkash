const axios = require('axios');
const bkashConfig = require("./config/bkashconfig.json");
const { authHeaders } = require('./authHeaders.js');

const executeAgreement = async (paymentID) => {
    try {
        const headers = await authHeaders();

        const requestData = {
            paymentID: paymentID,
        };

        const response = await axios.post(bkashConfig.execute_agreement_url, requestData, {
            headers: headers,
        });

        console.log('Execute Agreement Response Data:', response.data);

        if (response.data.statusCode === '0000') {
            return response.data;
        } else {
            throw new Error(`Agreement execution failed with status code: ${response.data.statusCode}`);
        }
    } catch (error) {
        console.error('Failed to execute agreement:', error.response ? error.response.data : error.message);
        throw new Error('Failed to execute agreement');
    }
};

module.exports = executeAgreement;
