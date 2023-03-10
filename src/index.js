const express = require('express'); 
const app = express();
const cors = require('cors');

app.use(cors())

const {userRouter} = require('./routes/user.route.js');

app.use(express.json());

app.use('/api',userRouter)

app.listen(4000, () => console.log('Listening on port 4000'));
