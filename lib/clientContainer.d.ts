import { EventsApi } from "../api/apis/EventsApi";
import { ConfigurationParameters } from "../api/runtime";
export interface ClientContainer {
    setConfig: (config?: ConfigurationParameters | undefined) => void;
    client: EventsApi | undefined;
}
export declare const makeClientContainer: () => ClientContainer;
