import * as events from './events';
import { createCaptureContext } from "./lib/capture";

declare global {
  // This needs to be a var for the window type to actually have that property
  // eslint-disable-next-line no-var
  var _OX_AUTH_TOKEN: string | undefined;
}

const { capture, configure } = createCaptureContext({initialized: !window._OX_AUTH_TOKEN});

if (window._OX_AUTH_TOKEN) {
  configure({ headers: { Authorization: `Bearer ${window._OX_AUTH_TOKEN}` } });
}

export { capture, events };
