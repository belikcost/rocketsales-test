const fetch = require('node-fetch');
const { API_URL } = require("../config");

module.exports = (clientId, clientSecret, authCode) => {

    return fetch(`${API_URL}/oauth2/access_token`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json;charset=utf-8'
        },
        body: JSON.stringify({
            client_id: clientId,
            client_secret: clientSecret,
            grant_type: 'authorization_code',
            code: authCode,
            redirect_uri: `https://test-belikcost.website.yandexcloud.net`
        })
    }).then(response => response.json())

}