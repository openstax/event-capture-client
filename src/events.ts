import { AccessedStudyguideV1ToJSON, AccessedStudyguideV1TypeEnum } from "./api/models/AccessedStudyguideV1";
import { ChangedStateV1ToJSON, ChangedStateV1TypeEnum } from "./api/models/ChangedStateV1";
import { CreatedHighlightV1ToJSON, CreatedHighlightV1TypeEnum } from "./api/models/CreatedHighlightV1";
import { InteractedElementV1ToJSON, InteractedElementV1TypeEnum } from "./api/models/InteractedElementV1";
import { NudgedV1ToJSON, NudgedV1TypeEnum } from "./api/models/NudgedV1";
import { StartedSessionV1ToJSON, StartedSessionV1TypeEnum } from "./api/models/StartedSessionV1";
import { createEvent } from "./lib/events";
import { clientClockProvider, createSessionProvider, referrerProvider, serviceWorkerStateProvider, sourceUriProvider, stateChangePrevious, typeProvider } from "./providers";

export { createEvent };

export const sessionProvider = createSessionProvider();

export const sessionStarted = createEvent(StartedSessionV1ToJSON,
  typeProvider(StartedSessionV1TypeEnum.OrgOpenstaxEcStartedSessionV1),
  clientClockProvider,
  referrerProvider(),
  sourceUriProvider(),
  sessionProvider,
  serviceWorkerStateProvider()
);

export const accessedStudyguide = createEvent(AccessedStudyguideV1ToJSON,
  typeProvider(AccessedStudyguideV1TypeEnum.OrgOpenstaxEcAccessedStudyguideV1),
  clientClockProvider,
  sourceUriProvider(),
  sessionProvider
);

export const createdHighlight = createEvent(CreatedHighlightV1ToJSON,
  typeProvider(CreatedHighlightV1TypeEnum.OrgOpenstaxEcCreatedHighlightV1),
  clientClockProvider,
  sourceUriProvider(),
  sessionProvider
);

export const nudged = createEvent(NudgedV1ToJSON,
  typeProvider(NudgedV1TypeEnum.OrgOpenstaxEcNudgedV1),
  clientClockProvider,
  sourceUriProvider(),
  sessionProvider
);

export const interacted = createEvent(InteractedElementV1ToJSON,
  typeProvider(InteractedElementV1TypeEnum.OrgOpenstaxEcInteractedElementV1),
  clientClockProvider,
  sourceUriProvider(),
  sessionProvider
);

export const stateChange = createEvent(ChangedStateV1ToJSON,
  typeProvider(ChangedStateV1TypeEnum.OrgOpenstaxEcChangedStateV1),
  stateChangePrevious(),
  clientClockProvider,
  sourceUriProvider(),
  sessionProvider
);
