
export type First<A extends Array<any>> = A[0];

// from https://stackoverflow.com/a/56370310
export type Rest<T extends any[]> =  ((...t: T) => void) extends ((h: any, ...r: infer R) => void) ? R : never;


export type UnionToIntersection<U> = (U extends any ? (k: U) => void : never) extends ((k: infer I) => void) ? I : never;
