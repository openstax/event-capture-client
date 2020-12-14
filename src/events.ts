import { AccessedStudyguideV1ToJSON, AccessedStudyguideV1TypeEnum } from "./api/models/AccessedStudyguideV1.js";
import { CreatedHighlightV1ToJSON, CreatedHighlightV1TypeEnum } from "./api/models/CreatedHighlightV1";
import { clientClockProvider, typeProvider, createSessionProvider} from "./providers";
import { createEvent } from "./lib/events";

const sessionProvider = createSessionProvider();

export const accessedStudyguide = createEvent(AccessedStudyguideV1ToJSON)(
  typeProvider(AccessedStudyguideV1TypeEnum),
  clientClockProvider,
  sessionProvider
);

export const createdHighlight = createEvent(CreatedHighlightV1ToJSON)(
  typeProvider(CreatedHighlightV1TypeEnum),
  clientClockProvider,
  sessionProvider
);
