const axios = require('axios').default;

const sendRequest = async (options) => {
    try {
        console.log("before sendRequest...")
        const { data } = await axios(options);
        console.log("after sendRequest...")
        return data;
    } catch (error) {

        throw error;
    }
}

module.exports = {
    sendRequest
}
