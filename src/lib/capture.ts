import { EventsApi } from "../api/apis/EventsApi";

import { EventPayload } from "./events";
import { jobRunner, JobRunnerOptions } from "./jobRunner";
import { client } from "./client";

type Queue = Array<() => EventPayload>;

type FlushOptions = JobRunnerOptions & {
  client: EventsApi;
  reportError: (error: any) => void;
}

const makeFlush = (queue: Queue, options: FlushOptions) => jobRunner(() => {
  const records = queue.splice(0);

  const events = records.map(record => ({data: record()}));

  const handleError = (e: any) => {
    if (e instanceof TypeError) {
      queue.unshift(...records);
      throw e;
    } else {
      options.reportError(e);
    }
  };

  // TODO - change api swagger
  //  - addEvent should be addEvents
  //  - payload schema is ridiculous
  return options.client.addEvent({events: {events}})
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

