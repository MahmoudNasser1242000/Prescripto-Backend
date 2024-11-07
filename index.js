import express from 'express'
import dbconnection from './database/dbConnection.js';
const app = express();

dbconnection()

app.get('/', (req, res) => res.send('Hello World!'))

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))