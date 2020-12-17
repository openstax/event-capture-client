
export interface JobRunnerOptions {
  timerLength?: number;
}

export const jobRunner = (job: () => Promise<any>, options: JobRunnerOptions) => {
  let timer: number | undefined;

  const clearTimer = () => {
    clearInterval(timer);
    timer = undefined;
  }

  const run = () => {
    clearTimer();
    job();
  }

  const runLater = () => {
    if (timer) {
      return;
    }

    timer = setTimeout(run, options.timerLength);
  };

  return {
    run,
    runLater
  }
};
