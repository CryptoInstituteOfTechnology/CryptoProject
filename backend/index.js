const express = require('express')
const app = express();
const cors = require('cors')
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(express.json());

app.use('/api/portfolio' , require('./routes/portfolio'))
app.use('/api/watchlist' , require('./routes/watchlist'))
app.use('/api/transactions' , require('./routes/transactions'))

app.listen(PORT, () =>{
    console.log(`server running on port ${PORT}`)
})