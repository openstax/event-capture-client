import { EventPayload } from "./events";
import { UnionToIntersection } from "./types";
export declare type ProviderInput = {
    [key: string]: any;
};
export declare type Provider<I extends ProviderInput, F extends EventPayload> = (input: I) => () => F;
export declare type GetProviderInput<P> = P extends Provider<infer I, any> ? I : never;
export declare type GetProviderFields<P> = P extends Provider<any, infer F> ? F : never;
export declare type CombineManyProviders<P extends Provider<any, any>[]> = Provider<Extract<UnionToIntersection<{
    [K in keyof P]: P[K] extends Provider<infer I, any> ? [I] : never;
}[number]>, [any]>[0], Extract<UnionToIntersection<{
    [K in keyof P]: P[K] extends Provider<any, infer P> ? [P] : never;
}[number]>, [any]>[0]>;
export declare const combineManyProviders: <P extends Provider<any, any>, Pa extends Provider<any, any>[]>(first: P, ...providers: Pa) => Provider<Extract<UnionToIntersection<(P extends Provider<infer I, any> ? [I] : never) | [Extract<UnionToIntersection<{ [K in keyof Pa]: Pa[K] extends Provider<infer I, any> ? [I] : never; }[number]>, [any]>[0]]>, [any]>[0], Extract<UnionToIntersection<(P extends Provider<any, infer P_1> ? [P_1] : never) | [Extract<UnionToIntersection<{ [K_1 in keyof Pa]: Pa[K_1] extends Provider<any, infer P_1> ? [P_1] : never; }[number]>, [any]>[0]]>, [any]>[0]>;
