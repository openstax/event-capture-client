import { CombineManyProviders, combineManyProviders, GetProviderFields, GetProviderInput, Provider } from "./providers";

export type EventPayload = {[key: string]: any};

export type EventFactory<I extends EventPayload, P extends Provider<any, any>> =
  (...input: keyof Omit<I, keyof GetProviderFields<P>> & GetProviderInput<P> extends never
    ? []
    : [Omit<I, keyof GetProviderFields<P>> & GetProviderInput<P>]
  ) => () => EventPayload;

export type EventPayloadFormatter<P extends EventPayload> = (payload: P | null | undefined) => EventPayload;

type CreateEvent = {
  <I extends EventPayload>(formatter: EventPayloadFormatter<I>): (input: I) => () => EventPayload;
  <I extends EventPayload, Pa extends Provider<any, any>[]>(formatter: EventPayloadFormatter<I>, ...providers: Pa): EventFactory<I, CombineManyProviders<Pa>>;
}

export const createEvent: CreateEvent = <I extends EventPayload, Pa extends Array<Provider<any, any>>>(formatter: EventPayloadFormatter<I>, ...providers: Pa) => {
  const [first, ...rest] = providers;

  if (!first) {
    return (input: I) => () => formatter(input);
  }

  const provider = combineManyProviders(first, ...rest);
  const factory: EventFactory<I, typeof provider> = (...args) => {
    const initializedProvider = provider(args[0]);
    return () => formatter({...initializedProvider(), ...args[0]})
  };

  return factory;

}
