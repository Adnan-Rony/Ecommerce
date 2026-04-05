import express from 'express';
import { initiateSSLPayment, sslSuccess, sslFail, sslCancel, sslIPN } from '../controllers/Sslpaymentcontroller.js';
import { verifyToken } from '../middleware/verifyToken.js';

const router = express.Router();

// Init payment — works for both logged-in and guest users
// Optionally attach verifyToken but allow guest (token optional)
router.post('/init', initiateSSLPayment);

// SSLCommerz callbacks — these are POST redirects from SSLCommerz
// They must NOT require token (SSLCommerz calls them directly)
router.post('/success/:tran_id', sslSuccess);
router.post('/fail/:tran_id',    sslFail);
router.post('/cancel/:tran_id',  sslCancel);
router.post('/ipn',              sslIPN);

export default router;