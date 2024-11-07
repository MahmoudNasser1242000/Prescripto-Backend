const globalErrorMiddleware = (err, req, res, next) => {
    res.status(err.statusCode || 500).json({ err: "Error", message: err.message, stack: err.stack })
}

export default globalErrorMiddleware