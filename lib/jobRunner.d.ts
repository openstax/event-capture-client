import { EventsApi } from "../api/apis/EventsApi";
import { ClientContainer } from "./clientContainer";
export interface JobRunnerOptions {
    sendingEnabled: boolean | (() => boolean);
    batchInterval: number;
    retryInterval: number;
}
export declare const jobRunner: (clientContainer: ClientContainer, job: (client: EventsApi) => Promise<any>, options: JobRunnerOptions) => {
    run: () => void;
    runLater: (interval?: number) => void;
};
