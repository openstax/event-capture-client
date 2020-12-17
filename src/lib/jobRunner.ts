
export interface JobRunnerOptions {
  batchInterval: number;
  retryInterval: number;
}

export const jobRunner = (job: () => Promise<any>, options: JobRunnerOptions) => {
  let timer: number | undefined;

  const clearTimer = () => {
    clearInterval(timer);
    timer = undefined;
  }

  const run = () => {
    clearTimer();
    job().catch(() => runLater(options.retryInterval));
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
