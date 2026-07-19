const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const app = require('./src/app');

app.listen(5000, () => {
    console.log('server listening to the port http://localhost:5000')
})