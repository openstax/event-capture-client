import { ConfigurationParameters } from "../api/runtime";
import { EventPayload } from "./events";
import { jobRunner, JobRunnerOptions } from "./jobRunner";
import { makeClientContainer, ClientContainer } from "./clientContainer";

type Queue = Array<() => EventPayload>;

type FlushOptions = JobRunnerOptions & {
  reportError: (error: any) => void;
}

const makeFlush = (queue: Queue, clientContainer: ClientContainer, options: FlushOptions) => jobRunner(clientContainer, client => {
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

  return client.addEvents({payload: {events}})
    .catch(handleError);

}, options);

type Options = Partial<Omit<FlushOptions, 'client'>> & {
  clientConfig?: ConfigurationParameters;
  initialized?: boolean;
  document?: Document;
};

const defaultOptions = {
  reportError: () => null,
  batchInterval: 60000,
  retryInterval: 60000,
  initialized: true,
  document: typeof document === 'undefined' ? undefined : document,
};

export const createCaptureContext = (passedOptions: Options = {}) => {
  const {document, clientConfig, ...options} = {...defaultOptions, ...passedOptions};
  const clientContainer = makeClientContainer();

  if (options.initialized) {
    clientContainer.setConfig(clientConfig);
  }

  const queue: Queue = [];
  const flush = makeFlush(queue, clientContainer, options);

  const capture = (event: Queue[number]) => {
    queue.push(event);
    flush.runLater();
  };

  if (document) {
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        flush.run();
      }
    });
  }

  return {capture, configure: clientContainer.setConfig};
};

