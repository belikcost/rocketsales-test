const fetch = require("node-fetch");

module.exports = (accessToken, url) => {
    return fetch(url, {
        headers: {
            'Authorization': `Bearer ${accessToken}`
        }
    });
}