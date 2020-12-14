import { Rest, UnionToIntersection } from "./types";
import { EventInput, EventPayload } from "./events";

export type Provider<I extends EventInput, F extends EventPayload> = (input: I) => () => F

export type ProviderInput<P> = P extends Provider<infer I, any> ? I : never;
export type ProviderFields<P> = P extends Provider<any, infer P> ? P : never;

// https://stackoverflow.com/a/65258855/14809536
export type CombineManyProviders<P extends Provider<any, any>[]> = Provider<
  Extract<UnionToIntersection<{ [K in keyof P]: P[K] extends Provider<infer I, any> ? [I] : never }[number]>, [any]>[0],
  Extract<UnionToIntersection<{ [K in keyof P]: P[K] extends Provider<any, infer P> ? [P] : never }[number]>, [any]>[0]
>;

const combineProviders = <P1 extends Provider<any, any>, P2 extends Provider<any, any>>(p1: P1, p2: P2): Provider<ProviderInput<P1> & ProviderInput<P2>, ProviderFields<P1> & ProviderFields<P2>> =>
  (input) => {
    const initialzedP1 = p1(input);
    const initialzedP2 = p2(input);

    return () => ({
      ...initialzedP1(),
      ...initialzedP2(),
    });
  }

const rest = <A extends any[]>(arr: A) => arr.slice(1) as Rest<A>;

export const combineManyProviders = <Pa extends Array<Provider<any, any>>>(...providers: Pa): CombineManyProviders<Pa> => providers.length === 1
  ? providers[0]
  : combineProviders(providers[0], combineManyProviders(...rest(providers)))
;
