'use strict';

Object.defineProperty(exports, '__esModule', { value: true });

var uuid = require('uuid');

const clientClockProvider = () => {
    const clientClockOccurredAt = new Date();
    return () => ({
        clientClockOccurredAt,
        clientClockSentAt: new Date(),
    });
};
const serviceWorkerStateProvider = (windowInput) => {
    const win = windowInput || (typeof window === 'undefined' ? undefined : window);
    return () => () => {
        if (!win || !('navigator' in win) || !('serviceWorker' in win.navigator)) {
            return { serviceWorker: 'unsupported' };
        }
        return {
            serviceWorker: win.navigator.serviceWorker.controller
                && win.navigator.serviceWorker.controller.state === 'activated'
                ? 'active'
                : 'inactive'
        };
    };
};
const createSessionProvider = (sessionUuid = uuid.v4(), orderState = 0) => () => {
    const sessionOrder = orderState++;
    return () => ({
        sessionUuid,
        sessionOrder,
    });
};
const typeProvider = (type) => () => () => ({ type });
const referrerProvider = (documentInput) => {
    const doc = documentInput || (typeof document === 'undefined' ? undefined : document);
    return (params) => () => {
        var _a;
        return ({
            referrer: (_a = (params && params.referrer)) !== null && _a !== void 0 ? _a : (doc ? doc.referrer : ''),
        });
    };
};
const sourceUriProvider = (windowInput) => {
    const win = windowInput || (typeof window === 'undefined' ? undefined : window);
    return (params) => () => {
        var _a;
        return ({
            sourceUri: (_a = (params && params.sourceUri)) !== null && _a !== void 0 ? _a : (win ? win.location.toString() : ''),
        });
    };
};
const stateChangePrevious = () => {
    const cache = {};
    return (params) => {
        const previous = cache[params.stateType] || null;
        cache[params.stateType] = params.current;
        return () => ({ previous });
    };
};

exports.clientClockProvider = clientClockProvider;
exports.createSessionProvider = createSessionProvider;
exports.referrerProvider = referrerProvider;
exports.serviceWorkerStateProvider = serviceWorkerStateProvider;
exports.sourceUriProvider = sourceUriProvider;
exports.stateChangePrevious = stateChangePrevious;
exports.typeProvider = typeProvider;
