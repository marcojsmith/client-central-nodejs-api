const axios = require('axios');
const config = require('../config');

/**
 * @architecture-ref: /architecture/api-client.md#base-client
 * Base API client that handles core functionality like:
 * - Axios instance setup
 * - Authentication
 * - Common utilities
 * - Error handling
 */
class BaseApiClient {
  constructor() {
    const baseUrl = config.api.baseUrl.endsWith('/')
      ? config.api.baseUrl.slice(0, -1)
      : config.api.baseUrl;

    // Initialize axios instance with default config
    this.client = axios.create({
      baseURL: baseUrl,
      params: {
        token: config.api.token
      },
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    // Add response interceptor for common error handling
    this.client.interceptors.response.use(
      response => response,
      error => {
        // Log error details
        console.error('API Request Failed:', {
          url: error.config?.url,
          method: error.config?.method,
          status: error.response?.status,
          data: error.response?.data
        });
        return Promise.reject(error);
      }
    );
  }

  /**
   * Helper method to format workspace filter query
   * @param {string|string[]} workspaceId - Single workspace ID or array of IDs
   * @param {string} context - Context for logging
   * @returns {string|null} Formatted filter query or null if no workspace ID
   */
  _formatWorkspaceFilter(workspaceId, context = '') {
    if (!workspaceId) {
      return null;
    }

    let filterQuery;
    if (Array.isArray(workspaceId)) {
      filterQuery = `workspace.id IN [${workspaceId.join(',')}]`;
      console.log('Creating multi-workspace filter:', {
        workspaceIds: workspaceId,
        filterSyntax: filterQuery,
        context
      });
    } else {
      filterQuery = `workspace.id = ${workspaceId}`;
      console.log('Creating single workspace filter:', {
        workspaceId,
        filterSyntax: filterQuery,
        context
      });
    }

    return filterQuery;
  }

  /**
   * Common error handler for API requests
   * @param {Error} error - The error object
   * @param {string} methodName - Name of the method where error occurred
   * @param {Object} additionalInfo - Any additional context info
   */
  _handleError(error, methodName, additionalInfo = {}) {
    const errorDetails = {
      method: methodName,
      message: error.message,
      status: error.response?.status,
      errors: error.response?.data?.errors,
      errorData: error.response?.data,
      requestConfig: {
        url: error.config?.url,
        method: error.config?.method,
        params: error.config?.params
      },
      ...additionalInfo
    };

    console.error('API Error:', errorDetails);

    // Add request details to error object for better debugging
    error.details = errorDetails;
    throw error;
  }
}

module.exports = BaseApiClient;