const axios = require('axios');
const bkashConfig = require("./config/bkashconfig.json");
const {authHeaders} = require ('./authHeaders.js');
const { response } = require('express');

const refundPayment = async (paymentID, amount, trxID, sku, reason) => {
    try {
        const headers = await authHeaders();  // Get valid headers, including Authorization

        const requestData = {
            paymentID,
            amount,
            trxID,
            sku,
            reason
        };

        const response = await axios.post(bkashConfig.refund_payment_url, requestData, { headers });

        console.log('Refund Response:', response.data);
        return response.data;
    } catch (error) {
        console.error('Failed to Refund Payment: ', error.response ? error.response.data : error.message);
        throw new Error('Failed to refund payment');
    }
};

module.exports = refundPayment;