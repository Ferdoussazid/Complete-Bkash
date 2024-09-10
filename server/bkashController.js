const express = require('express');
const router = express.Router();
const grantToken = require('./grantToken.js');
const createAgreement = require('./createAgreement.js');
const executeAgreement = require('./executeAgreement.js');
const queryAgreement = require('./queryAgreement.js');
const cancelAgreement = require('./cancelAgreement.js');
const createPayment = require('./createPayment.js'); 
const executePayment = require('./executePayment.js');
const searchTransaction = require('./searchTransaction.js');
const queryPayment = require('./queryPayment.js');
const refundPayment = require('./refundToken.js');
const refundStatus = require('./refundStatus.js');


router.post('/grant-token', async (req, res) => {
    try {
        const token = await grantToken();
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).json({ message: 'Failed to grant token', details: error.message });
    }
});


// bkash controller - router.post('/create-agreement')
router.post('/create-agreement', async (req, res) => {
    try {
        const { redirectURL, bkashURL } = await createAgreement();

        // Send the response data as JSON instead of redirecting
        res.json({
            bkashURL,
            redirectURL,
            message: 'Agreement created successfully'
        });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create an agreement', details: error.message });
    }
});



router.post('/execute-agreement', async (req, res) => {
    try {
        const { paymentID } = req.body;

        if (!paymentID) {
            return res.status(400).json({ message: 'Payment ID is required' });
        }

        const agreementResult = await executeAgreement(paymentID);
        res.status(200).json({ message: 'Agreement executed successfully', data: agreementResult });
    } catch (error) {
        res.status(500).json({ message: 'Failed to execute agreement', details: error.message });
    }
});


router.post('/query-agreement', async (req, res) => {
    try {
        const { agreementID } = req.body;

        if (!agreementID) {
            return res.status(400).json({ message: 'Agreement ID is required' });
        }

        const agreementResult = await queryAgreement(agreementID);
        res.status(200).json({ message: 'Agreement queried successfully', data: agreementResult });
    } catch (error) {
        res.status(500).json({ message: 'Failed to query agreement', details: error.message });
    }
});


router.post('/cancel-agreement', async (req, res) => {
    try {
        const { agreementID } = req.body;

        if (!agreementID) {
            return res.status(400).json({ message: 'Agreement ID is required' });
        }

        const cancelResult = await cancelAgreement(agreementID);
        res.status(200).json({ message: 'Agreement canceled successfully', data: cancelResult });
    } catch (error) {
        res.status(500).json({ message: 'Failed to cancel agreement', details: error.message });
    }
});


router.post('/createPayment', async (req, res) => {
    try {
        const { amount,agreementID } = req.body;
        if (!amount||!agreementID) {
            return res.status(400).json({ message: 'Amount and Agreement ID is required' });
        }

        const paymentResult = await createPayment(amount,agreementID);
        res.status(200).json({ message: 'Payment created successfully', data: paymentResult });
    } catch (error) {
        res.status(500).json({ message: 'Failed to create payment', details: error.message });
    }
});

router.post('/executePayment', async(req,res)=>{
    try {
        const {paymentID} = req.body;
        if(!paymentID){
            return res.status(400).json({message: 'Payment ID is required '});
        }

        const paymentResult = await executePayment(paymentID);
        res.status(200).json({message: 'Payment executed successfully', data: paymentResult});
    } catch(error)
    {
        res.status(500).json({message:'Failed to execute Payment', details:error.message});
    }
});

router.post('/queryPayment', async (req, res) => {
    try {
        const { paymentID } = req.body;

        // Check if paymentID is provided
        if (!paymentID) {
            return res.status(400).json({ message: 'Payment ID is required' });
        }

        // Call the queryPayment function with the paymentID
        const paymentResult = await queryPayment(paymentID);

        // Respond with the queried payment data
        res.status(200).json({
            message: 'Payment queried successfully',
            data: paymentResult
        });
    } catch (error) {
        // Handle errors and return appropriate message
        res.status(500).json({ message: 'Failed to query Payment', details: error.message });
    }
});

router.post('/searchTransaction', async (req, res) => {
    try {
        const { trxID } = req.body;

        // Validate the input
        if (!trxID) {
            return res.status(400).json({ message: 'Transaction ID is required' });
        }

        // Call the search transaction function
        const searchResult = await searchTransaction(trxID);

        // Respond with the search result
        res.status(200).json({
            message: 'Searched successfully',
            data: searchResult
        });
    } catch (error) {
        // Handle error
        res.status(500).json({ message: 'Failed to search transaction', details: error.message });
    }
});

router.post('/refundPayment', async (req, res) => {
    try {
        const { paymentID, amount, trxID, sku, reason } = req.body;

        // Validate input
        if (!amount || !paymentID || !trxID || !sku || !reason) {
            return res.status(400).json({ message: 'Every field is required' });
        }

        // Call the refund payment function
        const refundResult = await refundPayment(paymentID, amount, trxID, sku, reason);

        // Return success response
        res.status(200).json({ message: 'Successfully Refunded', data: refundResult });
    } catch (error) {
        // Handle error and return appropriate message
        res.status(500).json({ message: 'Refund Failed', details: error.message });
    }
});

router.post('/refundStatus', async (req, res) => {
    try {
        const { paymentID,trxID} = req.body;

        // Validate input
        if (!paymentID || !trxID) {
            return res.status(400).json({ message: 'Every field is required' });
        }

        // Call the refund payment function
        const refundResult = await refundStatus(paymentID, trxID);

        // Return success response
        res.status(200).json({ message: 'Successfully showing Refund Status', data: refundResult });
    } catch (error) {
        // Handle error and return appropriate message
        res.status(500).json({ message: 'Refund Status Failed', details: error.message });
    }
});





router.get('/callback', async (req, res) => {
    try {
        const { paymentID, status } = req.query;
        
        if (status === 'success') {
            const executeResponse = await executeAgreement(paymentID);
            res.redirect(`/result?message=Agreement Created And Executed Successfully!&data=${encodeURIComponent(JSON.stringify(executeResponse))}`);
        } else {
            res.status(400).json({ message: 'Payment failed or was cancelled' });
        }
    } catch (error) {
        res.status(500).json({ message: 'Failed to execute agreement', details: error.message });
    }
});

module.exports = router;
