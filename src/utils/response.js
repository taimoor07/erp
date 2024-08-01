const sendSuccessResponse = (res, data, message = 'Request was successful') => {
    res.status(200).json({
        status: 'success',
        message,
        data
    });
};

const sendErrorResponse = (res, errorCode, message, details = '') => {
    res.status(errorCode).json({
        status: 'error',
        message,
        error: {
        code: errorCode,
        details
        }
    });
};

module.exports = {
    sendSuccessResponse,
    sendErrorResponse
}
