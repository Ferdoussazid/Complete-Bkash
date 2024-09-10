const axios = require('axios');
const bkashConfig = require("./config/bkashconfig.json");
const { authHeaders } = require('./authHeaders.js')

const executePayment = async (paymentID) => {
    try{
        const headers  = await authHeaders();

        const requestData = {
            paymentID: paymentID
        };

        const response = await axios.post(bkashConfig.execute_payment_url, requestData, {headers});

        console.log('Response Data:', response.data)

        
    } catch (error) {
        console.error('Failed to execute payment:', error.response ? error.response.data : error.message);
        throw new Error('Failed to execute payment');
    }
};

module.exports = executePayment;