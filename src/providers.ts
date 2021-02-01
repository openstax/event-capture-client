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


export const referrerProvider = (doc: Document = document) => () => () => ({
  referrer: doc.referrer,
});

export const sourceUriProvider = (win: Window = window) => () => () => ({
  sourceUri: win.location.toString()
});
