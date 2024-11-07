import express from 'express'
import cors from "cors"
import dbconnection from './database/dbConnection.js';
import globalErrorMiddleware from './services/globalErrorMiddlewareFunc.js';
import AppError from './utils/AppErrorClass.js';
const app = express();
app.use(express.json())
app.use(cors())

dbconnection()

app.get('/', (req, res) => res.send('Hello from prescripto server'));

app.use("*", (req, res, next) => {
    next(new AppError("404 page not found!", 404))
})

app.use(globalErrorMiddleware)

const port = process.env.PORT || 3000
app.listen(port, () => console.log(`Example app listening on port ${port}!`))