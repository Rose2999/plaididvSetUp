const { Configuration, PlaidApi, PlaidEnvironments } = require('plaid');

const config = new Configuration({
  basePath: PlaidEnvironments[process.env.PLAID_ENV],
  baseOptions: {
    headers: {
      'Content-Type': 'application/json',
      'PLAID-CLIENT-ID': process.env.PLAID_CLIENT_ID,
      'PLAID-SECRET': process.env.PLAID_SECRET,
    },
  },
});

const plaidClient = new PlaidApi(config);

exports.createLinkToken = async (req, res) => {
  try {
    console.log('client_id:', process.env.PLAID_CLIENT_ID);
console.log('secret:', process.env.PLAID_SECRET);

    const response = await plaidClient.linkTokenCreate({
      client_id: process.env.PLAID_CLIENT_ID, 
      secret: process.env.PLAID_SECRET,       
      user: {
        client_user_id: 'customer_1',
      },
      client_name: 'My Plaid App',
      products: ['identity_verification'],
      language: 'en',
      country_codes: ['US'],
      link_customization_name: process.env.PLAID_IDENTITY_VERIFICATION_TEMPLATE_ID,
    });

    res.json({ link_token: response.data.link_token });
  } catch (error) {
    console.error('Error creating link token:', error.response?.data || error.message);
    res.status(500).json({ error: error.response?.data || error.message });
  }
};
