import * as events from './events';
import { createCaptureContext } from "./lib/capture";

declare global {
  var _OX_AUTH_TOKEN: string | undefined; // eslint-disable-line no-var
}

const { capture, configure } = createCaptureContext({initialized: !window._OX_AUTH_TOKEN});

if (window._OX_AUTH_TOKEN) {
  configure({ headers: { Authorization: window._OX_AUTH_TOKEN } });
}

export { capture, events };
