const axios = require('axios');
const bkashConfig = require("./config/bkashconfig.json");
const {authHeaders} = require ('./authHeaders.js');

const refundStatus = async (paymentID,trxID) => {
    try {
        const headers = await authHeaders();

        const requestData = {
            paymentID,
            trxID
        };

        const response = await axios.post(bkashConfig.refund_status_url, requestData, { headers });

        console.log('Refund Status:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to Refund Status: ', error.response ? error.response.data : error.message);
        throw new Error('Failed to refund Status');
    }
};

module.exports = refundStatus;