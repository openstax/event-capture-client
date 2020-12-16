import { combineManyProviders, Provider, ProviderFields, ProviderInput, CombineManyProviders } from "./providers";

export type EventInput = {[key: string]: any};
export type EventPayload = {[key: string]: any};
export type EventFactory<I extends EventInput, P extends Provider<any, any>> = (input: Omit<I, keyof ProviderFields<P>> & ProviderInput<P>) => () => EventPayload;
export type EventPayloadFormatter<P extends EventPayload> = (payload: P | null | undefined) => any;

export const createEvent = <I extends EventPayload>(formatter: EventPayloadFormatter<I>) =>
  <Pa extends Array<Provider<any, Partial<I>>>>(...providers: Pa): EventFactory<I, CombineManyProviders<Pa>> => {
    const provider = combineManyProviders(...providers);

    return (input) => {
      const initializedProvider = provider(input);
      return () => formatter({...initializedProvider(), ...input})
    }
  }
