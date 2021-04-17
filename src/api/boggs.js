import HTTPClient from "./axios";

const lookupReducer = (obj, item) => {
    obj[item.id] = item;
    return obj;
}

export const asLookup = (data) => data.reduce(lookupReducer, {})

const endpoints = Object.freeze({
    BUILDINGS: 'buildings',
    ORGANIZERS: 'organizers',
    CONTACTS: 'contacts',
    EVENTS: 'events',
    CALLEFFORTS: 'efforts/calls',
    EVENTS: 'events',
    ACTIVITYCODES: 'activities/codes',
})

export default Object.freeze({
    BUILDINGS: {
        get: (pk) => HTTPClient.get(pk ? `${endpoints.BUILDINGS}/${pk}/` : `${endpoints.BUILDINGS}/`),
        patch: (pk, data) => HTTPClient.patch(`${endpoints.BUILDINGS}/${pk}/`, JSON.stringify(data)),
        post: (data) => HTTPClient.post(`${endpoints.BUILDINGS}/`, JSON.stringify(data)),
        delete: (pk) => HTTPClient.delete(`${endpoints.BUILDINGS}/${pk}/`)
    },
    ORGANIZERS: {
        get: (pk) => HTTPClient.get(pk ? `${endpoints.ORGANIZERS}/${pk}/` : `${endpoints.ORGANIZERS}/`),
        patch: (pk, data) => HTTPClient.patch(`${endpoints.ORGANIZERS}/${pk}/`, JSON.stringify(data)),
        post: (data) => HTTPClient.post(`${endpoints.ORGANIZERS}/`, JSON.stringify(data)),
        delete: (pk) => HTTPClient.delete(`${endpoints.ORGANIZERS}/${pk}/`)
    },
    CALLEFFORTS: {
        get: (pk) => HTTPClient.get(pk ? `${endpoints.CALLEFFORTS}/${pk}/` : `${endpoints.CALLEFFORTS}/`),
        patch: (pk, data) => HTTPClient.patch(`${endpoints.CALLEFFORTS}/${pk}/`, JSON.stringify(data)),
        post: (data) => HTTPClient.post(`${endpoints.CALLEFFORTS}/`, JSON.stringify(data)),
        delete: (pk) => HTTPClient.delete(`${endpoints.CALLEFFORTS}/${pk}/`)
    },
    CONTACTS: {
        get: (pk) => HTTPClient.get(pk ? `${endpoints.CONTACTS}/${pk}/` : `${endpoints.CONTACTS}/`),
        patch: (pk, data) => HTTPClient.patch(`${endpoints.CONTACTS}/${pk}/`, JSON.stringify(data)),
        post: (data) => HTTPClient.post(`${endpoints.CONTACTS}/`, JSON.stringify(data)),
        delete: (pk) => HTTPClient.delete(`${endpoints.CONTACTS}/${pk}/`)
    },
    ACTIVITIES: {
        get: (pk) => HTTPClient.get(pk ? `${endpoints.ACTIVITIES}/${pk}/` : `${endpoints.ACTIVITIES}/`),
        patch: (pk, data) => HTTPClient.patch(`${endpoints.ACTIVITIES}/${pk}/`, JSON.stringify(data)),
        post: (data) => HTTPClient.post(`${endpoints.ACTIVITIES}/`, JSON.stringify(data)),
        delete: (pk) => HTTPClient.delete(`${endpoints.ACTIVITIES}/${pk}/`)
    },
    EVENTS: {
        get: (pk) => HTTPClient.get(pk ? `${endpoints.EVENTS}/${pk}/` : `${endpoints.EVENTS}/`),
        patch: (pk, data) => HTTPClient.patch(`${endpoints.EVENTS}/${pk}/`, JSON.stringify(data)),
        post: (data) => HTTPClient.post(`${endpoints.EVENTS}/`, JSON.stringify(data)),
        delete: (pk) => HTTPClient.delete(`${endpoints.EVENTS}/${pk}/`)
    },
    CALLEFFORTACTIVITIES: {
        get: (pk) => HTTPClient.get(pk ? `${endpoints.CALLEFFORTS}/${pk}/` : `${endpoints.CALLEFFORTS}/`),
        patch: (pk, data) => HTTPClient.patch(`${endpoints.CALLEFFORTS}/${pk}/`, JSON.stringify(data)),
        post: (data) => HTTPClient.post(`${endpoints.CALLEFFORTS}/`, JSON.stringify(data)),
        delete: (pk) => HTTPClient.delete(`${endpoints.CALLEFFORTS}/${pk}/`)
    },
    ACTIVITYCODES: {
        get: () => HTTPClient.get(`${endpoints.ACTIVITYCODES}/`)
    },
})
