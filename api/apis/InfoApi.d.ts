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
import * as runtime from '../runtime';
import { InfoResults } from '../models';
/**
 *
 */
export declare class InfoApi extends runtime.BaseAPI {
    /**
     * Get info on event capture
     * Get info on event capture
     */
    infoRaw(): Promise<runtime.ApiResponse<InfoResults>>;
    /**
     * Get info on event capture
     * Get info on event capture
     */
    info(): Promise<InfoResults>;
}
