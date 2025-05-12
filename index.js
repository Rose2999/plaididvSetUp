
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const plaidRoutes = require('./routes/plaidRoutes');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/plaid', plaidRoutes);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

