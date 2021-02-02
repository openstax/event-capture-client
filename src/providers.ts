import { v4 as uuid } from 'uuid';

export const clientClockProvider = () => {
  const clientClockOccurredAt = new Date();

  return () => ({
    clientClockOccurredAt,
    clientClockSentAt: new Date(),
  });
}

export const createSessionProvider = (sessionUuid: string = uuid(), orderState: number = 0) => () => {
  const sessionOrder = orderState++;

  return () => ({
    sessionUuid,
    sessionOrder,
  });
}

export const typeProvider = <T extends any>(type: T) => () => () => ({type});


export const referrerProvider = (documentInput?: Document) => {
  const doc = documentInput || (typeof document === 'undefined' ? undefined : document);

  return (params?: {referrer?: string}) => () => ({
    referrer: (params && params.referrer) ?? (doc ? doc.referrer : ''),
  });
};

export const sourceUriProvider = (windowInput?: Window) => {
  const win = windowInput || (typeof window === 'undefined' ? undefined : window);

  return (params?: {sourceUri?: string}) => () => ({
    sourceUri: (params && params.sourceUri) ?? (win ? win.location.toString() : ''),
  });
};
