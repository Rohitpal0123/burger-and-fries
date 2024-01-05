const axios = require("axios");

module.exports = async (url, method, headers, data, responseType) => {
  try {
    console.log("get user hit");
    console.log("Hit2");
    const response = await axios({
      method: method,
      url: url,
      body: data,
      headers: headers,
      responseType: responseType
    });

    console.log(response.data.flat());
    return response.data;
  } catch (error) {
    throw error;
  }
};
