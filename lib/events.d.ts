import { CombineManyProviders, GetProviderFields, GetProviderInput, Provider } from "./providers";
export declare type EventPayload = {
    [key: string]: any;
};
export declare type EventFactory<I extends EventPayload, P extends Provider<any, any>> = (...input: keyof Omit<I, keyof GetProviderFields<P>> & GetProviderInput<P> extends never ? [] : [Omit<I, keyof GetProviderFields<P>> & GetProviderInput<P>]) => () => EventPayload;
export declare type EventPayloadFormatter<P extends EventPayload> = (payload: P | null | undefined) => EventPayload;
declare type CreateEvent = {
    <I extends EventPayload>(formatter: EventPayloadFormatter<I>): (input: I) => () => EventPayload;
    <I extends EventPayload, Pa extends Provider<any, any>[]>(formatter: EventPayloadFormatter<I>, ...providers: Pa): EventFactory<I, CombineManyProviders<Pa>>;
};
export declare const createEvent: CreateEvent;
export {};
