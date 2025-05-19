require('dotenv').config();
const app = require('./src/app');

app.listen(3000, () => {
    console.log('server listening to the port http://localhost:3000')
})