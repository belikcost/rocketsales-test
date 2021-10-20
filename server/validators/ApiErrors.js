class ApiError extends Error {
    constructor(status, message) {
        super(message);

        this.status = status;
    }

    sendResponse(res) {
        return res.status(this.status).json({ message: this.message });
    }
}

class EmptyApiError extends ApiError {
    constructor(initialValue) {
        super(200, 'Empty');

        this.initialValue = initialValue;
    }

    sendResponse(res) {
        return res.status(this.status).json(this.initialValue);
    }
}

module.exports = {
    ApiError,
    EmptyApiError
};