export declare const clientClockProvider: () => () => {
    clientClockOccurredAt: Date;
    clientClockSentAt: Date;
};
export declare const serviceWorkerStateProvider: (windowInput?: Window | undefined) => () => () => {
    serviceWorker: 'unsupported' | 'inactive' | 'active';
};
export declare const createSessionProvider: (sessionUuid?: string, orderState?: number) => () => () => {
    sessionUuid: string;
    sessionOrder: number;
};
export declare const typeProvider: <T extends unknown>(type: T) => () => () => {
    type: T;
};
export declare const referrerProvider: (documentInput?: Document | undefined) => (params?: {
    referrer?: string | undefined;
} | undefined) => () => {
    referrer: string;
};
export declare const sourceUriProvider: (windowInput?: Window | undefined) => (params?: {
    sourceUri?: string | undefined;
} | undefined) => () => {
    sourceUri: string;
};
export declare const stateChangePrevious: () => (params: {
    stateType: string;
    current: string;
}) => () => {
    previous: string | null;
};
