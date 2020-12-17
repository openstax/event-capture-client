import { UnionToIntersection } from "./types";
import { EventPayload } from "./events";

export type ProviderInput = {[key: string]: any};
export type Provider<I extends ProviderInput, F extends EventPayload> = (input: I) => () => F

export type GetProviderInput<P> = P extends Provider<infer I, any> ? I : never;
export type GetProviderFields<P> = P extends Provider<any, infer P> ? P : never;

// https://stackoverflow.com/a/65258855/14809536
export type CombineManyProviders<P extends Provider<any, any>[]> = Provider<
  Extract<UnionToIntersection<{ [K in keyof P]: P[K] extends Provider<infer I, any> ? [I] : {} }[number]>, [any]>[0],
  Extract<UnionToIntersection<{ [K in keyof P]: P[K] extends Provider<any, infer P> ? [P] : {} }[number]>, [any]>[0]
>;

const combineProviders = <P1 extends Provider<any, any>, P2 extends Provider<any, any>>(p1: P1, p2: P2): Provider<GetProviderInput<P1> & GetProviderInput<P2>, GetProviderFields<P1> & GetProviderFields<P2>> =>
  (input) => {
    const initialzedP1 = p1(input);
    const initialzedP2 = p2(input);

    return () => ({
      ...initialzedP1(),
      ...initialzedP2(),
    });
  }

export const combineManyProviders = <P extends Provider<any, any>, Pa extends Provider<any, any>[]>(first: P, ...providers: Pa):
  CombineManyProviders<[P, CombineManyProviders<Pa>]> => {
  const [second, ...rest] = providers;

  if (!second) {
    return first;
  }

  return combineProviders(first, combineManyProviders(second, ...rest));
};
