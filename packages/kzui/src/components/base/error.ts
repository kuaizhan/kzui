class KZUIError extends Error {
    constructor(public code, message) {
        super(message);
        this.code = code;
    }
}

export default KZUIError;
