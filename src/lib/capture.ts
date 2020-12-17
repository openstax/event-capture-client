import { EventsApi } from "../api/apis/EventsApi";

import { EventPayload } from "./events";
import { jobRunner, JobRunnerOptions } from "./jobRunner";

type Queue = Array<() => EventPayload>;

type FlushOptions = JobRunnerOptions & {
  reportError: (error: any) => void;
}

const makeFlush = (client: EventsApi, queue: Queue, options: FlushOptions) => jobRunner(() => {
  const records = queue.splice(0);

  const events = records.map(record => record());

  const handleError = (e: any) => {
    if (e instanceof TypeError) {
      queue.unshift(...records);
    } else {
      options.reportError(e);
    }
  };

  // TODO - change api swagger
  //  - addEvent should be addEvents
  //  - payload schema is ridiculous
  return client.addEvent({events: {events}})
    .catch(handleError);

}, options);

type Options = Partial<FlushOptions> & {
  document?: Document
};

const defaultOptions: Required<Options> = {
  reportError: () => null,
  timerLength: 60000,
  document: document,
};

export const createCaptureContext = (client: EventsApi, passedOptions: Options = {}) => {
  const options = {...defaultOptions, ...passedOptions};

  const queue: Queue = [];

  const flush = makeFlush(client, queue, options);

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

