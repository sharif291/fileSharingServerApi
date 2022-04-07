/**
 * "Top 10" HTTP Status Code.
 * ################################
 * 2xx Success
 * 200 OK
 * 201 Created
 * 202 Accepted
 * 204 No Content
 * ################################
 * 3xx Redirection
 * 301 Moved Permanently
 * 302 Found
 * #################################
 * 4xx Client Error
 * 400 Bad Request
 * 401 Unauthorized
 * 403 Forbidden
 * 404 Not Found
 * 405 Method Not Allowed
 * 429 Too Many Requests
 * #################################
 * 5xx Server Error
 * 500 Internal Server Error
 * 502 Bad Gateway
 * 503 Service Unavailable
 * 504 Gateway Timeout
 */
// Function to make a response body according tot he given parameter
const generalResponse = (statsCode, status, message, data) => {
  if (data && data.length <= 1) {
    data = data[0];
  }
  return {
    status: statsCode || 200,
    success: status || true,
    message: message || "Operation was successful!",
    data: data || null,
  };
};

module.exports = {
  generalResponse,
};
