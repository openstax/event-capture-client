import * as events from './events';
import { createCaptureContext } from "./lib/capture";

const { capture } = createCaptureContext();

export { capture, events };
