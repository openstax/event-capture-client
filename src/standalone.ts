import * as events from './events';
import { getAuthHeaders } from './lib/authHeaders';
import { createCaptureContext } from "./lib/capture";

declare global {
  // These need to be vars for the window type to actually have the properties
  // eslint-disable-next-line no-var
  var _OX_AUTH_TOKEN: string | undefined;
  // eslint-disable-next-line no-var
  var _OX_LAUNCH_TOKEN: string | undefined;
}

const headers = getAuthHeaders(window);
const hasAuth = Object.keys(headers).length > 0;

const { capture, configure } = createCaptureContext({initialized: !hasAuth});

if (hasAuth) {
  configure({ headers });
}

export { capture, events };
