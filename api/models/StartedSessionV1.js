"use strict";
/* tslint:disable */
/* eslint-disable */
/**
 * OpenStax Event Capture API
 * The Event Capture API for OpenStax.  Requests to this API should include `application/json` in the `Accept` header.  The desired API version is specified in the request URL, e.g. `[domain]/api/v0`. While the API does support a default version, that version will change over time and therefore should not be used in production code!
 *
 * The version of the OpenAPI document: 0.1.0
 *
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */
Object.defineProperty(exports, "__esModule", { value: true });
exports.StartedSessionV1ToJSON = exports.StartedSessionV1FromJSONTyped = exports.StartedSessionV1FromJSON = exports.StartedSessionV1ServiceWorkerEnum = exports.StartedSessionV1TypeEnum = void 0;
const runtime_1 = require("../runtime");
/**
* @export
* @enum {string}
*/
var StartedSessionV1TypeEnum;
(function (StartedSessionV1TypeEnum) {
    StartedSessionV1TypeEnum["OrgOpenstaxEcStartedSessionV1"] = "org.openstax.ec.started_session_v1";
})(StartedSessionV1TypeEnum = exports.StartedSessionV1TypeEnum || (exports.StartedSessionV1TypeEnum = {})); /**
* @export
* @enum {string}
*/
var StartedSessionV1ServiceWorkerEnum;
(function (StartedSessionV1ServiceWorkerEnum) {
    StartedSessionV1ServiceWorkerEnum["Unsupported"] = "unsupported";
    StartedSessionV1ServiceWorkerEnum["Inactive"] = "inactive";
    StartedSessionV1ServiceWorkerEnum["Active"] = "active";
})(StartedSessionV1ServiceWorkerEnum = exports.StartedSessionV1ServiceWorkerEnum || (exports.StartedSessionV1ServiceWorkerEnum = {}));
function StartedSessionV1FromJSON(json) {
    return StartedSessionV1FromJSONTyped(json, false);
}
exports.StartedSessionV1FromJSON = StartedSessionV1FromJSON;
function StartedSessionV1FromJSONTyped(json, ignoreDiscriminator) {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        'clientClockOccurredAt': (new Date(json['client_clock_occurred_at'])),
        'clientClockSentAt': (new Date(json['client_clock_sent_at'])),
        'type': json['type'],
        'sourceUri': json['source_uri'],
        'referrer': json['referrer'],
        'sessionUuid': json['session_uuid'],
        'releaseId': !runtime_1.exists(json, 'release_id') ? undefined : json['release_id'],
        'serviceWorker': !runtime_1.exists(json, 'service_worker') ? undefined : json['service_worker'],
    };
}
exports.StartedSessionV1FromJSONTyped = StartedSessionV1FromJSONTyped;
function StartedSessionV1ToJSON(value) {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'client_clock_occurred_at': (value.clientClockOccurredAt.toISOString()),
        'client_clock_sent_at': (value.clientClockSentAt.toISOString()),
        'type': value.type,
        'source_uri': value.sourceUri,
        'referrer': value.referrer,
        'session_uuid': value.sessionUuid,
        'release_id': value.releaseId,
        'service_worker': value.serviceWorker,
    };
}
exports.StartedSessionV1ToJSON = StartedSessionV1ToJSON;
