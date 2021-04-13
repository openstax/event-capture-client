import { EventsApi } from "../api/apis/EventsApi";

import { ClientContainer } from "./clientContainer";

export interface JobRunnerOptions {
  sendingEnabled: boolean | (() => boolean);
  batchInterval: number;
  retryInterval: number;
}

export const jobRunner = (clientContainer: ClientContainer, job: (client: EventsApi) => Promise<any>, options: JobRunnerOptions) => {
  let timer: number | undefined;

  const sendingEnabled = () => options.sendingEnabled instanceof Function
    ? options.sendingEnabled()
    : options.sendingEnabled
  ;

  const clearTimer = () => {
    clearInterval(timer);
    timer = undefined;
  }

  const run = () => {
    clearTimer();

    if (clientContainer.client && sendingEnabled()) {
      job(clientContainer.client).catch(() => runLater(options.retryInterval));
    } else {
      runLater();
    }
  }

  const runLater = (interval: number = options.batchInterval) => {
    if (timer) {
      return;
    }

    timer = setTimeout(run, interval);
  };

  return {
    run,
    runLater
  }
};
