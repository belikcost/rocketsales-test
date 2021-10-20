const withAccessToken = require("../utils/withAccessToken");
const { API_URL } = require("../config");


module.exports = (accessToken, id) => {
    return withAccessToken(accessToken, `${API_URL}/api/v4/users/${id}`)
        .then(response => response.json());
}