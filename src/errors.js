class ApiError extends Error {
  constructor(message, originalError) {
    super(message);
    this.name = 'ApiError';
    this.originalError = originalError;
    this.statusCode = originalError?.response?.status || 500;
    
    if (Error.captureStackTrace) {
      Error.captureStackTrace(this, ApiError);
    }
  }

  toString() {
    return `${this.name}: ${this.message} (status: ${this.statusCode})`;
  }
}

module.exports = {
  ApiError
};