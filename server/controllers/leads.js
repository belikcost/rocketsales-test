const getTokens = require('../utils/getTokens');
const withAccessToken = require('../utils/withAccessToken');
const { clientId, clientSecret, authCode, API_URL } = require("../config");

const getPipelineInfo = (accessToken, id) => {
    return withAccessToken(accessToken, `${API_URL}/api/v4/leads/pipelines/${id}`)
        .then(response => response.json());
}

const getUserInfo = (accessToken, id) => {
    return withAccessToken(accessToken, `${API_URL}/api/v4/users/${id}`)
        .then(response => response.json());
}

const getContactInfo = (accessToken, id) => {
    return withAccessToken(accessToken, `${API_URL}/api/v4/contacts/${id}`)
        .then(response => response.json());
}

const getLeadsFetch = (accessToken) => {
    return withAccessToken(accessToken, `${API_URL}/api/v4/leads?with=contacts`)
        .then(response => response.json())
        .then(response => response._embedded.leads);
}

const buildLeads = async (leads, accessToken) => {
    const result = [];

    for (const lead of leads) {
        const responsibleUserId = lead.responsible_user_id;
        const pipelineId = lead.pipeline_id;
        const statusId = lead.status_id;
        const contacts = lead._embedded.contacts;
        console.log(lead);
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
            console.log(pipelineInfo);
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

module.exports = (req, res) => {
    getTokens(clientId, clientSecret, authCode)
        .then(response => response.access_token)
        .then(accessToken => {
            getLeadsFetch(accessToken)
                .then(leads => buildLeads(leads, accessToken))
                .then(leads => res.json(leads));
        });
}