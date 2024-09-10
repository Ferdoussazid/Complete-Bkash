const axios = require('axios');
const bkashConfig = require("./config/bkashconfig.json");
const { authHeaders } = require('./authHeaders');

const queryPayment = async (paymentID) => {
    try {
        
        const headers = await authHeaders();

        
        const requestData = {
            paymentID: paymentID
        };

        
        const response = await axios.post(bkashConfig.query_payment_url, requestData, { headers });

        
        console.log('Response Data:', response.data);


        return response.data;
    } catch (error) {
        
        console.error('Failed to query Payment: ', error.response ? error.response.data : error.message);
        throw new Error('Failed to query payment');
    }
};

module.exports = queryPayment;
