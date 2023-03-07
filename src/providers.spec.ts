import test from 'ava';

import { clientClockProvider, createSessionProvider, referrerProvider, serviceWorkerStateProvider, sourceUriProvider, stateChangePrevious } from "./providers";

test.afterEach(() => {
  //@ts-ignore
  delete global.window;
  //@ts-ignore
  delete global.document;
});

test('client clock provides dates', (t) => {
  const payload = clientClockProvider()();

  t.assert(payload.clientClockOccurredAt instanceof Date);
  t.assert(payload.clientClockSentAt instanceof Date);
});

test('client occurred at date does not change when re-computing payload', (t) => {
  const initialized = clientClockProvider();

  const date = initialized().clientClockOccurredAt;

  t.is(initialized().clientClockOccurredAt, date);
  t.is(initialized().clientClockOccurredAt, date);
});

test('client sent at date does change when re-computing payload', (t) => {
  const initialized = clientClockProvider();

  const date = initialized().clientClockSentAt;

  t.not(initialized().clientClockSentAt, date);
  t.not(initialized().clientClockSentAt, date);
});

test('session provides stuff', (t) => {
  const payload = createSessionProvider()()();

  t.assert(typeof payload.sessionUuid === 'string');
  t.assert(typeof payload.sessionOrder === 'number');
});

test('session order starts at 0', (t) => {
  const payload = createSessionProvider()()();

  t.is(payload.sessionOrder, 0);
});

test('session order increments', (t) => {
  const provider = createSessionProvider();

  t.is(provider()().sessionOrder, 0);
  t.is(provider()().sessionOrder, 1);
  t.is(provider()().sessionOrder, 2);
});

test('session order does not change after initialization', (t) => {
  const initialized = createSessionProvider()();

  t.is(initialized().sessionOrder, 0);
  t.is(initialized().sessionOrder, 0);
  t.is(initialized().sessionOrder, 0);
});

test('session uuid does not change', (t) => {
  const provider = createSessionProvider();

  const uuid = provider()().sessionUuid;

  t.is(provider()().sessionUuid, uuid);
  t.is(provider()().sessionUuid, uuid);
  t.is(provider()().sessionUuid, uuid);
});

test.serial('referrerProvider provider defaults to empty string', (t) => {
  const payload = referrerProvider()()();
  t.is(payload.referrer, '');
});

test.serial('referrerProvider provider uses global document', (t) => {
  const fakeDocument = {
    referrer: 'some string',
  }

  //@ts-ignore
  global.document = fakeDocument;

  const payload = referrerProvider()()();
  t.is(payload.referrer, 'some string');
});

test('referrerProvider provider uses document passed into base provider', (t) => {
  const fakeDocument = {
    referrer: 'some string',
  }
  const payload = referrerProvider(fakeDocument as Document)()();
  t.is(payload.referrer, 'some string');
});

test('referrerProvider provider uses referrer passed into the initializer', (t) => {
  const fakeDocument = {
    referrer: 'some string',
  }
  const payload = referrerProvider(fakeDocument as Document)({referrer: 'other string'})();
  t.is(payload.referrer, 'other string');
});

test('referrerProvider provider uses referrer passed into the initializer even if it is an empty string', (t) => {
  const fakeDocument = {
    referrer: 'some referrer',
  }
  const payload = referrerProvider(fakeDocument as Document)({referrer: ''})();
  t.is(payload.referrer, '');
});

test.serial('sourceUri provider defaults to empty string', (t) => {
  const payload = sourceUriProvider()()();
  t.is(payload.sourceUri, '');
});

test.serial('sourceUri provider uses global window', (t) => {
  const fakeWindow = {
    location: {
      toString: () => 'some string'
    }
  }

  //@ts-ignore
  global.window = fakeWindow;

  const payload = sourceUriProvider()()();
  t.is(payload.sourceUri, 'some string');
});

test('sourceUri provider uses window passed into base provider', (t) => {
  const fakeWindow = {
    location: {
      toString: () => 'some string'
    }
  }
  const payload = sourceUriProvider(fakeWindow as Window)()();
  t.is(payload.sourceUri, 'some string');
});

test('sourceUri provider uses uri passed into the initializer', (t) => {
  const fakeWindow = {
    location: {
      toString: () => 'some string'
    }
  }
  const payload = sourceUriProvider(fakeWindow as Window)({sourceUri: 'other string'})();
  t.is(payload.sourceUri, 'other string');
});

test('sourceUri provider uses uri passed into the initializer even if it is an empty string', (t) => {
  const fakeWindow = {
    location: {
      toString: () => 'some string'
    }
  }
  const payload = sourceUriProvider(fakeWindow as Window)({sourceUri: ''})();
  t.is(payload.sourceUri, '');
});

test.serial('serviceWorkerStateProvider returns unsupported without window', (t) => {
  const payload = serviceWorkerStateProvider()()();
  t.is(payload.serviceWorker, 'unsupported');
});

test('serviceWorkerStateProvider returns unsupported without navigator', (t) => {
  const fakeWindow = {}
  const payload = serviceWorkerStateProvider(fakeWindow as Window)()();
  t.is(payload.serviceWorker, 'unsupported');
});

test('serviceWorkerStateProvider returns unsupported without navigator.serviceWorker', (t) => {
  const fakeWindow = {
    navigator: {}
  }
  const payload = serviceWorkerStateProvider(fakeWindow as Window)()();
  t.is(payload.serviceWorker, 'unsupported');
});

test('serviceWorkerStateProvider returns inactive without navigator.serviceWorker.controller', (t) => {
  const fakeWindow = {
    navigator: {serviceWorker: {}}
  }
  const payload = serviceWorkerStateProvider(fakeWindow as Window)()();
  t.is(payload.serviceWorker, 'inactive');
});

test('serviceWorkerStateProvider returns inactive when navigator.serviceWorker.controller.state is not activated', (t) => {
  const fakeWindow = {
    navigator: {serviceWorker: {controller: {state: 'installing'}}}
  }
  const payload = serviceWorkerStateProvider(fakeWindow as Window)()();
  t.is(payload.serviceWorker, 'inactive');
});

test('serviceWorkerStateProvider returns active when navigator.serviceWorker.controller.state is activated', (t) => {
  const fakeWindow = {
    navigator: {serviceWorker: {controller: {state: 'activated'}}}
  }
  const payload = serviceWorkerStateProvider(fakeWindow as Window)()();
  t.is(payload.serviceWorker, 'active');
});

test('stateChangePrevious provides previous', (t) => {
  const provider = stateChangePrevious();

  t.deepEqual(provider({stateType: 'type1', current: 'someValue'})(), {
    previous: null,
  });
  t.deepEqual(provider({stateType: 'type1', current: 'someOtherValue'})(), {
    previous: 'someValue',
  });
});

test('stateChangePrevious provides namespaced previous', (t) => {
  const provider = stateChangePrevious();

  t.deepEqual(provider({stateType: 'type1', current: 'someValue1'})(), {
    previous: null,
  });
  t.deepEqual(provider({stateType: 'type2', current: 'someValue2'})(), {
    previous: null,
  });
  t.deepEqual(provider({stateType: 'type2', current: 'someOtherValue2'})(), {
    previous: 'someValue2',
  });
  t.deepEqual(provider({stateType: 'type1', current: 'someOtherValue1'})(), {
    previous: 'someValue1',
  });
});
