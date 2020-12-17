import test from 'ava';

import { clientClockProvider, createSessionProvider } from "./providers";

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
