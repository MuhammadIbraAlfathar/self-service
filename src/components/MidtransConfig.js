// midtransConfig.js
const midtransClient = require('midtrans-client');

// Create Snap API instance
let snap = new midtransClient.Snap({
    isProduction: false,
    serverKey: 'SB-Mid-server-HpeGtH2L10ZhmK37D89D3DwN',
    clientKey: 'SB-Mid-client-PYFaXDOmSKekRlzX'
});

module.exports = snap;
