import { ConfigurationParameters } from "../api/runtime";
import { EventPayload } from "./events";
import { JobRunnerOptions } from "./jobRunner";
declare type Queue = Array<() => EventPayload>;
declare type FlushOptions = JobRunnerOptions & {
    reportError: (error: any) => void;
};
declare type Options = Partial<Omit<FlushOptions, 'client'>> & {
    clientConfig?: ConfigurationParameters;
    initialized?: boolean;
    document?: Document;
};
export declare const createCaptureContext: (passedOptions?: Options) => {
    capture: (event: Queue[number]) => void;
    configure: (config?: ConfigurationParameters | undefined) => void;
    queue: readonly (() => EventPayload)[];
};
export {};
