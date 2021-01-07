import { AccessedStudyguideV1ToJSON, AccessedStudyguideV1TypeEnum } from "./api/models/AccessedStudyguideV1";
import { CreatedHighlightV1ToJSON, CreatedHighlightV1TypeEnum } from "./api/models/CreatedHighlightV1";
import { StartedSessionV1ToJSON, StartedSessionV1TypeEnum } from "./api/models/StartedSessionV1";
import { createEvent } from "./lib/events";
import { clientClockProvider, createSessionProvider, typeProvider} from "./providers";

export { createEvent };

export const sessionProvider = createSessionProvider();

export const sessionStarted = createEvent(StartedSessionV1ToJSON,
  typeProvider(StartedSessionV1TypeEnum.OrgOpenstaxEcStartedSessionV1),
  clientClockProvider,
  sessionProvider
);

export const accessedStudyguide = createEvent(AccessedStudyguideV1ToJSON,
  typeProvider(AccessedStudyguideV1TypeEnum.OrgOpenstaxEcAccessedStudyguideV1),
  clientClockProvider,
  sessionProvider
);

export const createdHighlight = createEvent(CreatedHighlightV1ToJSON,
  typeProvider(CreatedHighlightV1TypeEnum.OrgOpenstaxEcCreatedHighlightV1),
  clientClockProvider,
  sessionProvider
);
