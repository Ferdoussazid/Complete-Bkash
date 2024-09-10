const axios = require('axios');
const bkashConfig = require("./config/bkashconfig.json");
const { authHeaders } = require('./authHeaders.js');

const searchTransaction = async (trxID) => {
    try {
        
        const headers = await authHeaders();

        
        const requestData = {
            trxID: trxID
        };

        console.log('Headers:', headers);

        
        const response = await axios.post(bkashConfig.search_Transaction_url, requestData, { headers: headers });

        
        console.log('Response Data:', response.data);

        
        if(response.data.statusCode === '0000'){
            return response.data;
        }else{
            throw new Error(`Searching Failed with status code: ${response.data.statusCode}`);
        }
        
    } catch (error) {
        
        console.error('Failed to search Transaction: ', error.response ? error.response.data : error.message);
        throw new Error('Failed to search transaction');
    }
};

module.exports = searchTransaction;
