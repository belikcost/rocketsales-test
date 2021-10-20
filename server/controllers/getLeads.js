const cache = require('memory-cache');

const { clientId, clientSecret, authCode } = require("../config");
const { ApiError } = require("../validators/ApiErrors");
const { getUserInfo, getPipelineInfo, getContactInfo, getTokens, getLeads } = require("../fetchs");


const buildLeads = async (leads, accessToken) => {
    const result = [];

    for (const lead of leads) {
        const responsibleUserId = lead.responsible_user_id;
        const pipelineId = lead.pipeline_id;
        const statusId = lead.status_id;
        const contacts = lead._embedded.contacts;
        const leadToResult = {
            id: lead.id,
            name: lead.name,
            price: lead.price,
            createdAt: lead.created_at,
            contacts: []
        };

        await getUserInfo(accessToken, responsibleUserId).then(({ id, name }) => {
            leadToResult.responsibleUser = { id, name };
        });

        await getPipelineInfo(accessToken, pipelineId).then(pipelineInfo => {
            const statuses = pipelineInfo._embedded.statuses;

            for (const { id, name, color } of statuses) {
                if (id === statusId) {
                    leadToResult.status = { name, color };
                }
            }
        });

        for (const contact of contacts) {
            await getContactInfo(accessToken, contact.id).then(({ id, name, values, ...contactInfo }) => {
                const contactToResult = { id, name };
                const fields = contactInfo.custom_fields_values;

                for (const { values, ...field } of fields) {
                    const fieldCode = field.field_code;

                    if (fieldCode === 'PHONE') {
                        contactToResult.phones = values;
                    } else if (fieldCode === 'EMAIL') {
                        contactToResult.emails = values;
                    }
                }

                leadToResult.contacts.push(contactToResult);
            });

        }
        result.push(leadToResult);
    }

    return result;
}

module.exports = (req, res, next) => {
    const { query } = req.query;
    res.set('Access-Control-Allow-Origin', '*');

    let promiseWithAccessToken;
    const accessToken = cache.get('accessToken');

    if (accessToken) {
        promiseWithAccessToken = new Promise(resolve => {
            resolve(accessToken);
        });
    } else {
        promiseWithAccessToken = getTokens(clientId, clientSecret, authCode).then(response => response.access_token);
        promiseWithAccessToken.then(accessToken => {
            cache.put('accessToken', accessToken);
        });
    }

    promiseWithAccessToken.then(accessToken => {
        getLeads(accessToken, query)
            .then(leads => buildLeads(leads, accessToken))
            .then(leads => res.json(leads))
            .catch(err => {
                if (err instanceof ApiError) {
                    err.sendResponse(res);
                } else {
                    next(err);
                }
            });
    });
}