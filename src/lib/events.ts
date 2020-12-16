import { combineManyProviders, Provider, GetProviderFields, GetProviderInput } from "./providers";

export type EventPayload = {[key: string]: any};

export type EventFactory<I extends EventPayload, P extends Provider<any, any>> =
  (...input: keyof Omit<I, keyof GetProviderFields<P>> & GetProviderInput<P> extends never
    ? []
    : [Omit<I, keyof GetProviderFields<P>> & GetProviderInput<P>]
  ) => () => EventPayload;

export type EventPayloadFormatter<P extends EventPayload> = (payload: P | null | undefined) => EventPayload;

export const createEvent = <I extends EventPayload>(formatter: EventPayloadFormatter<I>) =>
  <Pa extends Array<Provider<any, any>>>(...providers: Pa) => {
    const provider = combineManyProviders(...providers);

    const factory: EventFactory<I, typeof provider> = (...args) => {
      const initializedProvider = provider(args[0]);
      return () => formatter({...initializedProvider(), ...args[0]})
    };

    return factory;

  }
