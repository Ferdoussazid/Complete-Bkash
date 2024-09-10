const axios = require('axios');
const bkashConfig = require("./config/bkashconfig.json");
const { authHeaders } = require('./authHeaders.js');

const createPayment = async (amount, agreementID) => {
    try {
        const headers = await authHeaders();

        const requestData = {
            agreementID: agreementID,
            mode: "0001",
            payerReference: "0173499999", 
            callbackURL: "http://localhost:3000/api/callback", 
            merchantAssociationInfo: "MI05MID54RF09123456One",
            amount: amount,
            currency: "BDT",
            intent: "sale",
            merchantInvoiceNumber: "Inv0124" 
        };

        const response = await axios.post(bkashConfig.create_payment_url, requestData, { headers });

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
        console.error('Failed to create payment:', error.response ? error.response.data : error.message);
        throw new Error('Failed to create payment');
    }
};

module.exports = createPayment;
