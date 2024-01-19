const axios = require("axios");

module.exports = async (url, method, headers, data, responseType) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      body: data,
      headers: headers,
      responseType: responseType
    });

    return response.data;
  } catch (error) {
    throw error;
  }
};
