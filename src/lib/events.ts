import { combineManyProviders, Provider, ProviderFields, ProviderInput, CombineManyProviders } from "./providers";

export type EventInput = {[key: string]: any};
export type EventPayload = {[key: string]: any};
export type EventFactory<I extends EventInput, P extends Provider<any, any>> = (input: Omit<I, keyof ProviderFields<P>> & ProviderInput<P>) => () => EventPayload;
export type EventPayloadFormatter<P extends EventPayload> = (payload: P | null | undefined) => any;

// TODO - there should be an error when provider types don't line up with the input type, but there isn't
export const createEvent = <I extends EventPayload>(formatter: EventPayloadFormatter<I>) =>
  <Pa extends Array<Provider<any, any>>>(...providers: Pa): EventFactory<I, CombineManyProviders<Pa>> => {
    const provider = combineManyProviders(...providers);

    return (input) => {
      const initializedProvider = provider(input);
      return () => formatter({...initializedProvider(), ...input})
    }
  }
