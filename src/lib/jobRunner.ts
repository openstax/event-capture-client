import { ClientContainer } from "./clientContainer";
import { EventsApi } from "../api/apis/EventsApi";

export interface JobRunnerOptions {
  batchInterval: number;
  retryInterval: number;
}

export const jobRunner = (clientContainer: ClientContainer, job: (client: EventsApi) => Promise<any>, options: JobRunnerOptions) => {
  let timer: number | undefined;

  const clearTimer = () => {
    clearInterval(timer);
    timer = undefined;
  }

  const run = () => {
    clearTimer();

    if (clientContainer.client) {
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
