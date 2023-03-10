import { AccessedStudyguideV1TypeEnum } from "./api/models/AccessedStudyguideV1";
import { ChangedStateV1TypeEnum } from "./api/models/ChangedStateV1";
import { CreatedHighlightV1TypeEnum } from "./api/models/CreatedHighlightV1";
import { InteractedElementV1TypeEnum } from "./api/models/InteractedElementV1";
import { NudgedV1TypeEnum } from "./api/models/NudgedV1";
import { StartedSessionV1TypeEnum } from "./api/models/StartedSessionV1";
import { createEvent } from "./lib/events";
export { createEvent };
export declare const sessionProvider: () => () => {
    sessionUuid: string;
    sessionOrder: number;
};
export declare const sessionStarted: import("./lib/events").EventFactory<import("./api/models/StartedSessionV1").StartedSessionV1, import("./lib/providers").Provider<import("./lib/providers").ProviderInput, {
    type: StartedSessionV1TypeEnum;
} & {
    clientClockOccurredAt: Date;
    clientClockSentAt: Date;
} & {
    referrer: string;
} & {
    sourceUri: string;
} & {
    sessionUuid: string;
    sessionOrder: number;
} & {
    serviceWorker: "unsupported" | "inactive" | "active";
}>>;
export declare const accessedStudyguide: import("./lib/events").EventFactory<import("./api/models/AccessedStudyguideV1").AccessedStudyguideV1, import("./lib/providers").Provider<import("./lib/providers").ProviderInput, {
    clientClockOccurredAt: Date;
    clientClockSentAt: Date;
} & {
    sourceUri: string;
} & {
    sessionUuid: string;
    sessionOrder: number;
} & {
    type: AccessedStudyguideV1TypeEnum;
}>>;
export declare const createdHighlight: import("./lib/events").EventFactory<import("./api/models/CreatedHighlightV1").CreatedHighlightV1, import("./lib/providers").Provider<import("./lib/providers").ProviderInput, {
    clientClockOccurredAt: Date;
    clientClockSentAt: Date;
} & {
    sourceUri: string;
} & {
    sessionUuid: string;
    sessionOrder: number;
} & {
    type: CreatedHighlightV1TypeEnum;
}>>;
export declare const nudged: import("./lib/events").EventFactory<import("./api/models/NudgedV1").NudgedV1, import("./lib/providers").Provider<import("./lib/providers").ProviderInput, {
    clientClockOccurredAt: Date;
    clientClockSentAt: Date;
} & {
    sourceUri: string;
} & {
    sessionUuid: string;
    sessionOrder: number;
} & {
    type: NudgedV1TypeEnum;
}>>;
export declare const interacted: import("./lib/events").EventFactory<import("./api/models/InteractedElementV1").InteractedElementV1, import("./lib/providers").Provider<import("./lib/providers").ProviderInput, {
    clientClockOccurredAt: Date;
    clientClockSentAt: Date;
} & {
    sourceUri: string;
} & {
    sessionUuid: string;
    sessionOrder: number;
} & {
    type: InteractedElementV1TypeEnum;
}>>;
export declare const stateChange: import("./lib/events").EventFactory<import("./api/models/ChangedStateV1").ChangedStateV1, import("./lib/providers").Provider<import("./lib/providers").ProviderInput & {
    stateType: string;
    current: string;
}, {
    clientClockOccurredAt: Date;
    clientClockSentAt: Date;
} & {
    sourceUri: string;
} & {
    sessionUuid: string;
    sessionOrder: number;
} & {
    type: ChangedStateV1TypeEnum;
} & {
    previous: string | null;
}>>;
