const { API_URL } = require("../config");
const withAccessToken = require("../utils/withAccessToken");
const { EmptyApiError } = require("../validators/ApiErrors");


module.exports = (accessToken, query) => {
    let url = `${API_URL}/api/v4/leads?with=contacts`;
    if (query) {
        url += `&query=${query}`
    }

    return withAccessToken(accessToken, url)
        .then(response => {
            if (response.status === 204) {
                throw new EmptyApiError([]);
            } else if (response.status !== 200) {
                throw new Error();
            }
            return response.json();
        })
        .then(response => response._embedded.leads);
}