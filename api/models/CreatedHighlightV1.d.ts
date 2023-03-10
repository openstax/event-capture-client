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
/**
 *
 * @export
 * @interface CreatedHighlightV1
 */
export interface CreatedHighlightV1 {
    /**
     * The RFC 3339 section 5.6 date-time when event actually occurred.
     * @type {Date}
     * @memberof CreatedHighlightV1
     */
    clientClockOccurredAt: Date;
    /**
     * The RFC 3339 section 5.6 date-time when event was sent to the server.
     * @type {Date}
     * @memberof CreatedHighlightV1
     */
    clientClockSentAt: Date;
    /**
     * The data's type.
     * @type {string}
     * @memberof CreatedHighlightV1
     */
    type: CreatedHighlightV1TypeEnum;
    /**
     * client location when event occurred.
     * @type {string}
     * @memberof CreatedHighlightV1
     */
    sourceUri: string;
    /**
     * The UUID of the current session, previously generated by the client and submitted in a "session started" event.
     * @type {string}
     * @memberof CreatedHighlightV1
     */
    sessionUuid: string;
    /**
     * The event's numerical order within this session. E.g. the first event after a session is started should give 0 for this field, the next one should give 1, etc.
     * @type {number}
     * @memberof CreatedHighlightV1
     */
    sessionOrder: number;
    /**
     * The highlight id.
     * @type {string}
     * @memberof CreatedHighlightV1
     */
    highlightId: string;
    /**
     * The highlight source type (e.g., openstax_page).
     * @type {string}
     * @memberof CreatedHighlightV1
     */
    sourceType: string;
    /**
     * The highlight source id (e.g., page uuid).
     * @type {string}
     * @memberof CreatedHighlightV1
     */
    sourceId: string;
    /**
     * The highlight source metadata.
     * @type {object}
     * @memberof CreatedHighlightV1
     */
    sourceMetadata: object;
    /**
     * The highlight annotation.
     * @type {string}
     * @memberof CreatedHighlightV1
     */
    annotation: string;
    /**
     * The highlight anchor.
     * @type {string}
     * @memberof CreatedHighlightV1
     */
    anchor: string;
    /**
     * The highlight color.
     * @type {string}
     * @memberof CreatedHighlightV1
     */
    color: string;
    /**
     * The highlight location strategies (e.g., a text position selector).
     * @type {string}
     * @memberof CreatedHighlightV1
     */
    locationStrategies: string;
    /**
     * The highlight location scope (container for the source, like a book uuid).
     * @type {string}
     * @memberof CreatedHighlightV1
     */
    scopeId: string;
}
/**
* @export
* @enum {string}
*/
export declare enum CreatedHighlightV1TypeEnum {
    OrgOpenstaxEcCreatedHighlightV1 = "org.openstax.ec.created_highlight_v1"
}
export declare function CreatedHighlightV1FromJSON(json: any): CreatedHighlightV1;
export declare function CreatedHighlightV1FromJSONTyped(json: any, ignoreDiscriminator: boolean): CreatedHighlightV1;
export declare function CreatedHighlightV1ToJSON(value?: CreatedHighlightV1 | null): any;
