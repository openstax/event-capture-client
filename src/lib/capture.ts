import { EventsApi } from "../api/apis/EventsApi";

import { client } from "./client";
import { EventPayload } from "./events";
import { jobRunner, JobRunnerOptions } from "./jobRunner";

type Queue = Array<() => EventPayload>;

type FlushOptions = JobRunnerOptions & {
  client: EventsApi;
  reportError: (error: any) => void;
}

const makeFlush = (queue: Queue, options: FlushOptions) => jobRunner(() => {
  const records = queue.splice(0);

  if (records.length === 0) {
    return Promise.resolve();
  }

  const events = records.map(record => ({data: record()}));

  const handleError = (e: any) => {
    if (e instanceof TypeError) {
      queue.unshift(...records);
      throw e;
    } else {
      options.reportError(e);
    }
  };

  return options.client.addEvents({payload: {events}})
    .catch(handleError);

}, options);

type Options = Partial<FlushOptions> & {
  document?: Document;
};

const defaultOptions: Required<Options> = {
  client,
  reportError: () => null,
  batchInterval: 60000,
  retryInterval: 60000,
  document: document,
};

export const createCaptureContext = (passedOptions: Options = {}) => {
  const options = {...defaultOptions, ...passedOptions};

  const queue: Queue = [];

  const flush = makeFlush(queue, options);

  const capture = (event: Queue[number]) => {
    queue.push(event);
    flush.runLater();
  };

  options.document.addEventListener('visibilitychange', () => {
    if (options.document.visibilityState === 'hidden') {
      flush.run();
    }
  });

  return capture;
};

